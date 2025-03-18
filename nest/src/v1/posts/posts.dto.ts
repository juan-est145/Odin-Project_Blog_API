import { ApiProperty } from "@nestjs/swagger";
import { Posts } from "@prisma/client";
import { IsInt, IsOptional, IsPositive, IsUUID } from "class-validator";
import { IErrorResponseDto } from "../v1.dto";

export class PostDto implements Posts {
	@ApiProperty()
	title: string;
	@ApiProperty()
	id: string;
	@ApiProperty()
	userId: number;
	@ApiProperty()
	subtitle: string | null;
	@ApiProperty()
	text: string;
	@ApiProperty()
	createdAt: Date;
	@ApiProperty()
	updatedAt: Date;
	@ApiProperty()
	published: boolean;
}

export class InvalidRequestErrorDto implements IErrorResponseDto {
	@ApiProperty({ example: 400 })
	statusCode: number;

	@ApiProperty({ example: "Bad Request", isArray: true })
	message: string[];

	@ApiProperty({ example: "Validation failed" })
	error: string;
}

export class QueryGetPostsDto {
	@ApiProperty({
		required: false,
		description:
			"The number of posts you wished returned. It must be a positive number, and if it exceeds the total amount of posts, it returns all of them",
		type: Number,
	})
	@IsOptional()
	@IsInt()
	@IsPositive()
	nmbOfPosts?: number;
}

export class PostsRequestParams {
	@IsUUID()
	id: string;
}
