import { Injectable, InternalServerErrorException } from "@nestjs/common";
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
			});
		} catch {
			throw new InternalServerErrorException();
		}
	}
}
