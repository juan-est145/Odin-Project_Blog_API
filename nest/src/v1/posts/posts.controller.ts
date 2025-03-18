import { Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { PostsService } from "./posts.service";
import {
	InvalidRequestErrorDto,
	PostDto,
	PostsRequestParams,
	QueryGetPostsDto,
} from "./posts.dto";
import {
	ApiBadRequestResponse,
	ApiOkResponse,
	ApiTags,
	ApiBearerAuth,
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
		return await this.postsService.findAll(true, query.nmbOfPosts);
	}
	@Post(":id")
	async getPostId(
		@Param() param: PostsRequestParams,
	): Promise<PostDto | undefined> {
		return await this.postsService.findOne(param.id);
	}
	// TO DO: Add nmbOfCmmnts query parameter
	@Get(":id/comments")
	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	async getPostComments(
		@Param() param: PostsRequestParams,
	): Promise<CommentDto[]> {
		return await this.commentsService.getAll(param.id);
	}
}
