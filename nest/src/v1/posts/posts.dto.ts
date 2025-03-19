import { ApiProperty } from "@nestjs/swagger";
import { Posts } from "@prisma/client";
import {
	IsBooleanString,
	IsInt,
	IsOptional,
	IsPositive,
	IsUUID,
} from "class-validator";
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

export class NotFoundErrorDto implements IErrorResponseDto {
	@ApiProperty({ example: 404 })
	statusCode: number;

	@ApiProperty({ example: "Not found" })
	message: string;
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

	@ApiProperty({
		required: false,
		description:
			"If present returns either only either published posts or non-published posts. Leave empty if you want all of them",
		type: Boolean,
	})
	@IsOptional()
	@IsBooleanString()
	published?: "true" | "false" | "1" | "0";
}

export class QueryGetPostIdCommentsDto {
	@ApiProperty({
		required: false,
		description:
			"The number of comments you wished returned. It must be a positive number, and if it exceeds the total amount of comments, it returns all of them",
		type: Number,
	})
	@IsOptional()
	@IsInt()
	@IsPositive()
	nmbOfCmnts?: number;
}

export class PostsRequestParams {
	@ApiProperty({ description: "The id of the post" })
	@IsUUID()
	id: string;
}
