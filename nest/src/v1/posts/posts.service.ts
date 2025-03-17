import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DbService } from "src/db/db.service";
import { Posts } from "@prisma/client";

@Injectable()
export class PostsService {
	constructor(private prisma: DbService) {}
	async findAll(
		published: boolean = true,
		nmbOfPosts: number = 10,
	): Promise<Posts[]> {
		try {
			const posts: Posts[] = await this.prisma.posts.findMany({
				where: { published },
				take: nmbOfPosts,
				orderBy: { updatedAt: "desc" },
			});
			return posts;
		} catch {
			throw new InternalServerErrorException();
		}
	}
}
