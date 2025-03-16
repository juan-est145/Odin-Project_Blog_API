import { Controller, Get, Query } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Posts } from "@prisma/client";
import { QueryGetPostsDto } from "./posts.dto";

@Controller("posts")
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@Get()
	async getPosts(@Query() query: QueryGetPostsDto): Promise<Posts[] | null> {
		return await this.postsService.findAll(true, query.nmbOfPosts);
	}
}
