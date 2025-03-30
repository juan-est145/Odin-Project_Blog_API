import {
	Controller,
	Get,
	Query,
	Delete,
	Param,
	Put,
	Body,
} from "@nestjs/common";
import { CommentsService } from "../comments/comments.service";
import {
	AccntCommentsDto,
	CommentIdParam,
	DeleteCommentRes,
	QueryGetCommentsDto,
} from "./accnt.dto";
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
import { PostCommentsDto } from "../posts/posts.dto";

@UseGuards(AuthGuard)
@Controller()
export class AccntController {
	constructor(private comment: CommentsService) {}
	@Get("/comments")
	@ApiBearerAuth()
	@ApiOkResponse({
		description: "Returns the comments made by the user",
		type: AccntCommentsDto,
		isArray: true,
	})
	@ApiForbiddenResponse({
		description: "Returns an error if not using jwt or an invalid one",
		type: ForbiddenRequestErrorDto,
	})
	@ApiBadRequestResponse({
		description: "If the request is invalid, it returns the error",
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

	@Delete("/comments/:commentId")
	@ApiBearerAuth()
	@ApiBadRequestResponse({
		description: "If the request is invalid, it returns the error",
		type: InvalidRequestErrorDto,
	})
	@ApiForbiddenResponse({
		description:
			"Returns an error if not using jwt or an invalid one or if comment id does not belong to the user",
		type: ForbiddenRequestErrorDto,
	})
	@ApiOkResponse({
		description: "Returns a confirmation message alongside a 200 status code",
		type: DeleteCommentRes,
	})
	async deleteComment(
		@Param() param: CommentIdParam,
		@User() user: JwtPayload,
	): Promise<DeleteCommentRes> {
		const comment = await this.comment.deleteUserComment(
			param.commentId,
			user.id,
		);
		return {
			code: 200,
			message: `Comment ${comment.id} was deleted successfully`,
		};
	}

	@Put("/comments/:commentId")
	@ApiBearerAuth()
	async updateComment(
		@Param() param: CommentIdParam,
		@User() user: JwtPayload,
		@Body() body: PostCommentsDto,
	) {
		return await this.comment.updateComment(
			param.commentId,
			user.id,
			body.text,
		);
	}
}
