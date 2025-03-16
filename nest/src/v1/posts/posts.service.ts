import { Injectable } from "@nestjs/common";
import { Posts } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PostsService {
	constructor(private prisma: PrismaService) {}
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
