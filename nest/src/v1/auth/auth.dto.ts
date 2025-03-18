import { $Enums } from "@prisma/client";
import { IsString, IsStrongPassword, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Request } from "express";
import { IErrorResponseDto } from "../v1.dto";

export class LogInBodyDto {
	@IsString()
	@Length(5, 40)
	username: string;
	@IsString()
	@IsStrongPassword({
		minLength: 8,
		minUppercase: 1,
		minSymbols: 1,
		minLowercase: 1,
	})
	password: string;
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

export class LogInBadRequestDto implements IErrorResponseDto {
	@ApiProperty({ example: 400 })
	statusCode: number;

	@ApiProperty({ example: "Password is not strong enough", isArray: true })
	message: string[];

	@ApiProperty({ example: "Bad request" })
	error: string;
}

export class LogInUnauthorizedDto implements IErrorResponseDto {
	@ApiProperty({ example: 401 })
	statusCode: number;

	@ApiProperty({ example: "Unauthorized", isArray: true })
	message: string[];
}
