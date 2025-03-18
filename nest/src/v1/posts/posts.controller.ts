import { Controller, Get, Query } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { InvalidRequestErrorDto, PostDto, QueryGetPostsDto } from "./posts.dto";
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Posts")
@Controller()
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

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
}
