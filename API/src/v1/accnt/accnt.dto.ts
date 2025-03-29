import { ApiProperty } from "@nestjs/swagger";
import { Comments } from "@prisma/client";
import { IsOptional, IsInt, IsPositive } from "class-validator";

export class QueryGetCommentsDto {
	@ApiProperty({
		required: false,
		description:
			"The number of comments you wished returned. It must be a positive number, and if it exceeds the total amount of comments, it returns all of them",
		type: Number,
	})
	@IsOptional()
	@IsInt()
	@IsPositive()
	nmbOfCmmnts?: number;
}

export class AccntCommentsDto implements Comments {
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
	postTitle: string;
}
