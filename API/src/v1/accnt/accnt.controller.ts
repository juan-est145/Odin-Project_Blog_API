import { Controller, Get, Query } from "@nestjs/common";
import { CommentsService } from "../comments/comments.service";
import { AccntCommentsDto, QueryGetCommentsDto } from "./accnt.dto";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/guard/auth.guard";
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiForbiddenResponse,
	ApiOkResponse,
} from "@nestjs/swagger";
import { User } from "../users/user.decorator";
import { JwtPayload } from "../auth/auth.dto";
import { ForbiddenRequestErrorDto, InvalidRequestErrorDto } from "../v1.dto";

@Controller()
export class AccntController {
	constructor(private comment: CommentsService) {}
	@Get("/comments")
	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({
		description: "Returns the comments made by the user",
		type: AccntCommentsDto,
	})
	@ApiForbiddenResponse({
		description: "Returns an error if not using jwt or an invalid one",
		type: ForbiddenRequestErrorDto,
	})
	@ApiBadRequestResponse({
		description: "If the request is invalid, it returns ther error",
		type: InvalidRequestErrorDto,
	})
	async getComments(
		@Query() query: QueryGetCommentsDto,
		@User() user: JwtPayload,
	): Promise<AccntCommentsDto[]> {
		const comments = await this.comment.getUserComments(
			user.id,
			query.nmbOfCmmnts,
		);
		return comments.map((element) => ({
			id: element.id,
			userId: element.userId,
			postId: element.postId,
			text: element.text,
			createdAt: element.createdAt,
			updatedAt: element.updatedAt,
			postTitle: element.Posts.title,
		}));
	}
}
