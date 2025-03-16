import { Injectable } from "@nestjs/common";
import { Posts } from "@prisma/client";
import { DbService } from "src/db/db.service";

@Injectable()
export class PostsService {
	constructor(private prisma: DbService) {}
	async findAll(
		published: boolean = true,
		nmbOfPosts: number = 10,
	): Promise<Posts[] | null> {
		try {
			const posts: Posts[] | null = await this.prisma.posts.findMany({
				where: { published },
				take: nmbOfPosts,
				orderBy: { updatedAt: "desc" },
			});
			return posts;
		} catch {
			return null;
		}
	}
}
