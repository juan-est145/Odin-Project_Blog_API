import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { PostsService } from "./posts.service";
import {
	InvalidRequestErrorDto,
	NotFoundErrorDto,
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
} from "@nestjs/swagger";
import { AuthGuard } from "../auth/guard/auth.guard";
import { CommentsService } from "../comments/comments.service";
import { CommentDto } from "../comments/comments.dto";

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
}
