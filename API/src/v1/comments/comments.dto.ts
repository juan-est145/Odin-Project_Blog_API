import { ApiProperty } from "@nestjs/swagger";
import { Comments } from "@prisma/client";

export class CommentDto implements Comments {
	@ApiProperty()
	id: string;
	@ApiProperty()
	userId: number;
	@ApiProperty()
	postId: string;
	@ApiProperty()
	text: string;
	@ApiProperty()
	createdAt: Date;
	@ApiProperty()
	updatedAt: Date;
	@ApiProperty()
	username?: string;
}
