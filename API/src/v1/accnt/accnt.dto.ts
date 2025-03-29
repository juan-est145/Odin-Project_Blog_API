import { ApiProperty } from "@nestjs/swagger";
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
