import { Controller, Get } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Posts } from "@prisma/client";

@Controller("posts")
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@Get()
	async getPosts(): Promise<Posts[] | null> {
		return await this.postsService.findAll();
	}
}
