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
		nmbOfPosts: number = 10,
		published?: boolean,
	): Promise<Posts[]> {
		const publishSearch = published !== undefined ? { published } : {};
		try {
			const posts: Posts[] = await this.prisma.posts.findMany({
				where: publishSearch,
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
			throw new InternalServerErrorException();
		}
	}

	async createPost(
		title: string,
		userId: number,
		text: string,
		published: boolean,
		subtitle?: string,
	) {
		try {
			return await this.prisma.posts.create({
				data: { title, userId, subtitle, text, published },
			});
		} catch {
			throw new InternalServerErrorException();
		}
	}

	async findUserPosts(
		nmbOfPosts: number = 10,
		userId: number,
		published?: boolean,
	) {
		try {
			const whereClause =
				published === undefined ? { userId } : { userId, published };
			return await this.prisma.posts.findMany({
				where: whereClause,
				take: nmbOfPosts,
				orderBy: { updatedAt: "desc" },
			});
		} catch {
			throw new InternalServerErrorException();
		}
	}

	async updatePost(
		title: string,
		postId: string,
		userId: number,
		text: string,
		published: boolean,
		subtitle?: string,
	) {
		try {
			return await this.prisma.posts.update({
				where: { userId, id: postId },
				data: { title, text, published, subtitle },
			});
		} catch {
			throw new InternalServerErrorException();
		}
	}
}
