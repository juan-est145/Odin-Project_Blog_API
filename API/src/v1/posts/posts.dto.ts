import { ApiProperty } from "@nestjs/swagger";
import { Posts } from "@prisma/client";
import {
	IsBooleanString,
	IsInt,
	IsOptional,
	IsPositive,
	IsUUID,
	Length,
} from "class-validator";

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

export class PostCommentsDto {
	static readonly min: number = 1;
	static readonly max: number = 8362;
	@ApiProperty({
		description: "The content of the comment",
		additionalProperties: {
			minLength: PostCommentsDto.min,
			maxLength: PostCommentsDto.max,
		},
	})
	@Length(PostCommentsDto.min, PostCommentsDto.max, {
		message: `Comment length must have between ${PostCommentsDto.min} and ${PostCommentsDto.max} characters`,
	})
	text: string;
}
