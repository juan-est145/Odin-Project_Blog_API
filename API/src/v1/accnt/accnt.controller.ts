import { Controller, Get } from "@nestjs/common";
import { CommentsService } from "../comments/comments.service";

@Controller()
export class AccntController {
	constructor(private comment: CommentsService) {}
	@Get("/comments")
	getComments() {}
}
