import { Controller, DefaultValuePipe, Get, Query } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Posts } from "@prisma/client";
import { PositiveIntVal } from "./validation.pipe";

@Controller("posts")
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@Get()
	async getPosts(
		@Query("nmbOfPosts", new DefaultValuePipe("10"), PositiveIntVal)
		nmbOfPosts?: number,
	): Promise<Posts[] | null> {
		return await this.postsService.findAll(true, nmbOfPosts);
	}
}
