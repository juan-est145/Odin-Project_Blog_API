import { ApiProperty } from "@nestjs/swagger";
import { Comments } from "@prisma/client";
import {
	IsOptional,
	IsInt,
	IsPositive,
	IsUUID,
	Length,
	IsBooleanString,
} from "class-validator";

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

export class CommentIdParam {
	@ApiProperty()
	@IsUUID()
	commentId: string;
}

export class DeleteCommentRes {
	@ApiProperty({
		example: 200,
	})
	code: number;
	@ApiProperty()
	message: string;
}

export class CreatePostBodyDto {
	static readonly minLength: number = 1;
	static readonly maxTitleLength: number = 255;
	static readonly maxSubtitleLenght: number = 255;
	static readonly maxTextLength: number = 16724;

	@ApiProperty({
		additionalProperties: {
			maxLength: CreatePostBodyDto.maxTitleLength,
			minLength: CreatePostBodyDto.minLength,
		},
	})
	@Length(CreatePostBodyDto.minLength, CreatePostBodyDto.maxTitleLength)
	title: string;

	@ApiProperty({
		required: false,
		additionalProperties: {
			maxLength: CreatePostBodyDto.maxSubtitleLenght,
			minLength: CreatePostBodyDto.minLength,
		},
	})
	@IsOptional()
	@Length(CreatePostBodyDto.minLength, CreatePostBodyDto.maxSubtitleLenght)
	subtitle?: string;

	@ApiProperty({
		additionalProperties: {
			maxLength: CreatePostBodyDto.maxTextLength,
			minLength: CreatePostBodyDto.minLength,
		},
	})
	@Length(CreatePostBodyDto.minLength, CreatePostBodyDto.maxTextLength)
	text: string;

	@ApiProperty()
	@IsBooleanString()
	publish: "true" | "false" | "1" | "0";
}
