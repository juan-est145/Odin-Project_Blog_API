import { $Enums } from "@prisma/client";
import { IsString, IsStrongPassword, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Request } from "express";
import { IErrorResponseDto } from "../v1.dto";
import { PasswordsMatches } from "./auth.customVal";

interface IAuthBody {
	username: string;
	password: string;
	confPass?: string;
}

export class LogInBodyDto implements IAuthBody {
	@IsString()
	@Length(5, 40, {
		message: "Username must have a min length of 5 and a max length of 40",
	})
	username: string;

	@IsString()
	@IsStrongPassword(
		{
			minLength: 8,
			minUppercase: 1,
			minSymbols: 1,
			minLowercase: 1,
		},
		{
			message:
				"Password must have a minimum length of 8, one uppercase and lowercase letter and a special symbol",
		},
	)
	password: string;
}

export class SignInBodyDto implements IAuthBody {
	@ApiProperty()
	@IsString()
	@Length(5, 40, {
		message: "Username must have a length between 5 and 40 characters",
	})
	username: string;

	@ApiProperty({
		description:
			"A password that needs to have a min length of 8, and one of each of the following properties: a lowercase and uppercase letter and a special symbol",
	})
	@IsString()
	@IsStrongPassword(
		{
			minLength: 8,
			minUppercase: 1,
			minSymbols: 1,
			minLowercase: 1,
		},
		{
			message:
				"Password must have at least a length of 8 characters, and it must have at least one of the following: an uppercase letter, a lowercase letter and a special symbol",
		},
	)
	password: string;

	@ApiProperty({
		description: "A confirmation field for the password",
	})
	@PasswordsMatches("password")
	confPass: string;
}

export class JwtPayload {
	username: string;
	id: number;
	role: $Enums.Roles;
}

export interface RequestJwt extends Request {
	user?: JwtPayload;
}

export class LogInResDto {
	@ApiProperty({
		example:
			"eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzA4MzQ1MTIzLCJleHAiOjE3MDgzNTUxMjN9",
		type: "string",
	})
	token: string;
}

export class SignInResDto {
	username: string;
	statusCode: number = 201;
}

export class LogInBadRequestDto implements IErrorResponseDto {
	@ApiProperty({ example: 400 })
	statusCode: number;

	@ApiProperty({ example: "Password is not strong enough" })
	message: string[];

	@ApiProperty({ example: "Bad request" })
	error: string;
}

export class LogInUnauthorizedDto implements IErrorResponseDto {
	@ApiProperty({ example: 401 })
	statusCode: number;

	@ApiProperty({ example: "Unauthorized" })
	message: string[];
}

export class SignInBadRequestDto implements IErrorResponseDto {
	@ApiProperty({ example: 400 })
	statusCode: number;

	@ApiProperty({ example: "Passwords do not match" })
	message: string[];

	@ApiProperty({ example: "Bad request" })
	error: string;
}

export class SignInConflictResponseDto implements IErrorResponseDto {
	@ApiProperty({ example: 409 })
	statusCode: number;
	@ApiProperty({ example: "Username is already taken" })
	message: string;
}
