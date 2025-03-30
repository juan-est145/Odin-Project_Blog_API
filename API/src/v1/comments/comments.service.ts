import {
	Injectable,
	InternalServerErrorException,
	UnauthorizedException,
} from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { DbService } from "src/db/db.service";

@Injectable()
export class CommentsService {
	constructor(private prisma: DbService) {}
	async getAll(postId: string, nmbOfCmmnts: number = 10) {
		try {
			return await this.prisma.comments.findMany({
				where: { postId },
				orderBy: { updatedAt: "desc" },
				take: nmbOfCmmnts,
				include: { Users: { select: { username: true } } },
			});
		} catch {
			throw new InternalServerErrorException();
		}
	}

	async postComment(text: string, postId: string, userId: number) {
		try {
			return await this.prisma.comments.create({
				data: { text, postId, userId },
			});
		} catch {
			throw new InternalServerErrorException();
		}
	}

	async getUserComments(userId: number, nmbOfCmmnts: number = 10) {
		try {
			return await this.prisma.comments.findMany({
				where: { userId },
				take: nmbOfCmmnts,
				orderBy: { updatedAt: "desc" },
				include: { Posts: { select: { title: true } } },
			});
		} catch {
			throw new InternalServerErrorException();
		}
	}

	async deleteUserComment(commentId: string, userId: number) {
		try {
			return await this.prisma.comments.delete({
				where: { id: commentId, userId },
			});
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === "P2016"
			)
				throw new UnauthorizedException();
			throw new InternalServerErrorException();
		}
	}

	async updateComment(commentId: string, userId: number, text: string) {
		try {
			return await this.prisma.comments.update({
				where: { id: commentId, userId },
				data: { text },
			});
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === "P2016"
			)
				throw new UnauthorizedException();
			throw new InternalServerErrorException();
		}
	}
}
