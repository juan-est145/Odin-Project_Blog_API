import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { DbService } from "src/db/db.service";
import { Posts } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

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
	async findOne(
		id: string,
		published: boolean = true,
	): Promise<Posts | undefined> {
		try {
			const post: Posts = await this.prisma.posts.findUniqueOrThrow({
				where: { id, published },
			});
			return post;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError)
				throw new NotFoundException();
		}
	}
}
