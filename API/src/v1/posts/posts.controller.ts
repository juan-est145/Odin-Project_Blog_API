import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Query,
	UseGuards,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import {
	ForbiddenRequestErrorDto,
	InvalidRequestErrorDto,
	NotFoundErrorDto,
	PostCommentsDto,
	PostDto,
	PostsRequestParams,
	QueryGetPostIdCommentsDto,
	QueryGetPostsDto,
} from "./posts.dto";
import {
	ApiBadRequestResponse,
	ApiOkResponse,
	ApiTags,
	ApiBearerAuth,
	ApiNotFoundResponse,
	ApiCreatedResponse,
	ApiForbiddenResponse,
} from "@nestjs/swagger";
import { AuthGuard } from "../auth/guard/auth.guard";
import { CommentsService } from "../comments/comments.service";
import { CommentDto } from "../comments/comments.dto";
import { User } from "../users/user.decorator";
import { JwtPayload } from "../auth/auth.dto";

@ApiTags("Posts")
@Controller()
export class PostsController {
	constructor(
		private readonly postsService: PostsService,
		private readonly commentsService: CommentsService,
	) {}

	@Get()
	@ApiOkResponse({
		description:
			"Returns a collection of posts. The default value is 10. If a higher value is specified, it returns the maximum amount of posts there is",
		type: PostDto,
		isArray: true,
	})
	@ApiBadRequestResponse({
		type: InvalidRequestErrorDto,
	})
	async getPosts(@Query() query: QueryGetPostsDto): Promise<PostDto[]> {
		let published: boolean | undefined = undefined;
		if (query.published) {
			published = query.published === "true" || query.published === "1";
		}
		return await this.postsService.findAll(query.nmbOfPosts, published);
	}

	@Get(":id")
	@ApiOkResponse({
		description: "Returns the post that matches the provided id",
		type: PostDto,
	})
	@ApiBadRequestResponse({
		description: "Returns an invalid message if the id is not a UUID",
		type: InvalidRequestErrorDto,
	})
	@ApiNotFoundResponse({
		description: "Returns a not found message if the id does not exist",
		type: NotFoundErrorDto,
	})
	async getPostId(
		@Param() param: PostsRequestParams,
	): Promise<PostDto | undefined> {
		return await this.postsService.findOne(param.id);
	}

	@Get(":id/comments")
	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({
		description: "Returns an array of comments",
		type: CommentDto,
		isArray: true,
	})
	@ApiForbiddenResponse({
		description: "Returns an error if not using jwt or an invalid one",
		type: ForbiddenRequestErrorDto,
	})
	async getPostComments(
		@Param() param: PostsRequestParams,
		@Query() query: QueryGetPostIdCommentsDto,
	): Promise<CommentDto[]> {
		const comments = await this.commentsService.getAll(
			param.id,
			query.nmbOfCmnts,
		);
		return comments.map((element) => ({
			id: element.id,
			userId: element.userId,
			postId: element.postId,
			text: element.text,
			createdAt: element.createdAt,
			updatedAt: element.updatedAt,
			username: element.Users.username,
		}));
	}

	@Post(":id/comments")
	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	@ApiCreatedResponse({
		description: "Returns the data of the comment schema",
		type: CommentDto,
	})
	@ApiBadRequestResponse({
		description:
			"Returns an invalid message if there is an error in the request",
		type: InvalidRequestErrorDto,
	})
	@ApiForbiddenResponse({
		description: "Returns an error if not using jwt or an invalid one",
		type: ForbiddenRequestErrorDto,
	})
	async postPostComment(
		@Param() reqParam: PostsRequestParams,
		@User() userJwt: JwtPayload,
		@Body() comment: PostCommentsDto,
	): Promise<CommentDto> {
		return await this.commentsService.postComment(
			comment.text,
			reqParam.id,
			userJwt.id,
		);
	}
}
