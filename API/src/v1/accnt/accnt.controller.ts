import { Controller, Get, Query } from "@nestjs/common";
import { CommentsService } from "../comments/comments.service";
import { QueryGetCommentsDto } from "./accnt.dto";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/guard/auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { User } from "../users/user.decorator";
import { JwtPayload } from "../auth/auth.dto";

@Controller()
export class AccntController {
	constructor(private comment: CommentsService) {}
	@Get("/comments")
	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	async getComments(
		@Query() query: QueryGetCommentsDto,
		@User() user: JwtPayload,
	) {
		return await this.comment.getUserComments(user.id, query.nmbOfCmmnts);
	}
}
