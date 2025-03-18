import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DbService } from "src/db/db.service";

@Injectable()
export class CommentsService {
	constructor(private prisma: DbService) {}
	async getAll(postId: string) {
		try {
			return await this.prisma.comments.findMany({ where: { postId } });
		} catch {
			throw new InternalServerErrorException();
		}
	}
}
