import {
	Controller,
	Post,
	Get,
	Query,
	Delete,
	Param,
	Put,
	Body,
	UnauthorizedException,
	BadRequestException,
} from "@nestjs/common";
import { CommentsService } from "../comments/comments.service";
import {
	AccntCommentsDto,
	CommentIdParam,
	CreatePostBodyDto,
	DeleteCommentRes,
	PostReqParam,
	QueryGetCommentsDto,
	UpgradeAccntBodyDto,
	UpgradeAccntRes,
} from "./accnt.dto";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/guard/auth.guard";
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiOkResponse,
} from "@nestjs/swagger";
import { User } from "../users/user.decorator";
import { JwtPayload } from "../auth/auth.dto";
import { ForbiddenRequestErrorDto, InvalidRequestErrorDto } from "../v1.dto";
import { PostCommentsDto, PostDto, QueryGetPostsDto } from "../posts/posts.dto";
import { PostsService } from "../posts/posts.service";
import { Roles } from "../auth/auth.decorator";
import { UsersService } from "../users/users.service";

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller()
export class AccntController {
	constructor(
		private comment: CommentsService,
		private post: PostsService,
		private users: UsersService,
	) {}
	@Get("/comments")
	@ApiOkResponse({
		description: "Returns the comments made by the user",
		type: AccntCommentsDto,
		isArray: true,
	})
	@ApiForbiddenResponse({
		description: "Returns an error if not using jwt or an invalid one",
		type: ForbiddenRequestErrorDto,
	})
	@ApiBadRequestResponse({
		description: "If the request is invalid, it returns the error",
		type: InvalidRequestErrorDto,
	})
	async getComments(
		@Query() query: QueryGetCommentsDto,
		@User() user: JwtPayload,
	): Promise<AccntCommentsDto[]> {
		const comments = await this.comment.getUserComments(
			user.id,
			query.nmbOfCmmnts,
		);
		return comments.map((element) => ({
			id: element.id,
			userId: element.userId,
			postId: element.postId,
			text: element.text,
			createdAt: element.createdAt,
			updatedAt: element.updatedAt,
			postTitle: element.Posts.title,
		}));
	}

	@Get("/posts")
	@Roles("POSTER")
	@ApiOkResponse({
		description:
			"Returns the posts of the user. The default value is 10. If a higher value is specified than the ones in the database, it returns the maximum amount of posts there is",
		type: PostDto,
		isArray: true,
	})
	@ApiBadRequestResponse({
		description: "If the request is invalid, it returns the error",
		type: InvalidRequestErrorDto,
	})
	@ApiForbiddenResponse({
		description:
			"Returns an error if not using jwt or an invalid one or if the user is not a poster",
		type: ForbiddenRequestErrorDto,
	})
	async getAccntPosts(
		@Query() query: QueryGetPostsDto,
		@User() user: JwtPayload,
	): Promise<PostDto[]> {
		let published: undefined | boolean = undefined;
		if (query.published) {
			published = query.published === "true" || query.published === "1";
		}
		return await this.post.findUserPosts(query.nmbOfPosts, user.id, published);
	}

	@Get("/upgrade")
	@ApiOkResponse({
		description: "Returns the current role of the user",
		type: UpgradeAccntRes,
	})
	@ApiBadRequestResponse({
		description: "Returns if the the user id in the jwt does not exist",
		type: InvalidRequestErrorDto,
	})
	async getRole(@User() user: JwtPayload): Promise<UpgradeAccntRes> {
		const result = await this.users.getUserId(user.id);
		if (result) return { role: result.role };
		throw new BadRequestException();
	}

	@Post("/posts")
	@Roles("POSTER")
	@ApiCreatedResponse({
		description: "Returns the created post",
		type: PostDto,
	})
	@ApiBadRequestResponse({
		description: "If the request is invalid, it returns the error",
		type: InvalidRequestErrorDto,
	})
	@ApiForbiddenResponse({
		description:
			"Returns an error if not using jwt or an invalid one or if the user is not a poster",
		type: ForbiddenRequestErrorDto,
	})
	async createPost(
		@Body() body: CreatePostBodyDto,
		@User() user: JwtPayload,
	): Promise<PostDto> {
		const published: boolean = body.publish === "1" || body.publish === "true";
		return await this.post.createPost(
			body.title,
			user.id,
			body.text,
			published,
			body.subtitle,
		);
	}

	@Post("/upgrade")
	@Roles("USER")
	@ApiCreatedResponse({
		description: "Returns the new role assigned to the account",
		type: UpgradeAccntRes,
	})
	@ApiForbiddenResponse({
		description:
			"Returns an error if the user already has that role, it is not logged in or the passcode is incorrect",
		type: ForbiddenRequestErrorDto,
	})
	async upgradeAccnt(
		@Body() body: UpgradeAccntBodyDto,
		@User() user: JwtPayload,
	): Promise<UpgradeAccntRes> {
		if (body.passCode !== process.env.UPGRADE_PASSCODE)
			throw new UnauthorizedException();
		const { role } = await this.users.upgradeAccnt(user.id);
		return { role: role };
	}

	@Put("/comments/:commentId")
	@ApiOkResponse({
		description: "Returns the data of the updated comment",
		type: AccntCommentsDto,
	})
	@ApiBadRequestResponse({
		description: "If the request is invalid, it returns the error",
		type: InvalidRequestErrorDto,
	})
	@ApiForbiddenResponse({
		description:
			"Returns an error if not using jwt or an invalid one or if comment id does not belong to the user",
		type: ForbiddenRequestErrorDto,
	})
	async updateComment(
		@Param() param: CommentIdParam,
		@User() user: JwtPayload,
		@Body() body: PostCommentsDto,
	): Promise<AccntCommentsDto> {
		const comment = await this.comment.updateComment(
			param.commentId,
			user.id,
			body.text,
		);
		return {
			id: comment.id,
			userId: comment.userId,
			postId: comment.postId,
			text: comment.text,
			createdAt: comment.createdAt,
			updatedAt: comment.updatedAt,
			postTitle: comment.Posts.title,
		};
	}

	@Put("/posts/:postId")
	@Roles("POSTER")
	@ApiCreatedResponse({
		description: "Returns the updated post",
		type: PostDto,
	})
	@ApiBadRequestResponse({
		description: "If the request is invalid, it returns the error",
		type: InvalidRequestErrorDto,
	})
	@ApiForbiddenResponse({
		description:
			"Returns an error if not using jwt or an invalid one or if the user is not a poster",
		type: ForbiddenRequestErrorDto,
	})
	async updatePost(
		@Param() param: PostReqParam,
		@Body() body: CreatePostBodyDto,
		@User() user: JwtPayload,
	): Promise<PostDto> {
		const published: boolean = body.publish === "1" || body.publish === "true";
		return await this.post.updatePost(
			body.title,
			param.postId,
			user.id,
			body.text,
			published,
		);
	}

	@Delete("/posts/:postId")
	@Roles("POSTER")
	@ApiOkResponse({
		description: "Returns the deleted post",
		type: PostDto,
	})
	@ApiBadRequestResponse({
		description: "If the request is invalid, it returns the error",
		type: InvalidRequestErrorDto,
	})
	@ApiForbiddenResponse({
		description:
			"Returns an error if not using jwt or an invalid one or if the user is not a poster",
		type: ForbiddenRequestErrorDto,
	})
	async deletePost(@User() user: JwtPayload, @Param() param: PostReqParam) {
		return await this.post.deletePost(user.id, param.postId);
	}

	@Delete("/comments/:commentId")
	@ApiBadRequestResponse({
		description: "If the request is invalid, it returns the error",
		type: InvalidRequestErrorDto,
	})
	@ApiForbiddenResponse({
		description:
			"Returns an error if not using jwt or an invalid one or if comment id does not belong to the user",
		type: ForbiddenRequestErrorDto,
	})
	@ApiOkResponse({
		description: "Returns a confirmation message alongside a 200 status code",
		type: DeleteCommentRes,
	})
	async deleteComment(
		@Param() param: CommentIdParam,
		@User() user: JwtPayload,
	): Promise<DeleteCommentRes> {
		const comment = await this.comment.deleteUserComment(
			param.commentId,
			user.id,
		);
		return {
			code: 200,
			message: `Comment ${comment.id} was deleted successfully`,
		};
	}
}
