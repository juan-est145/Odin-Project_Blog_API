import { ApiProperty } from "@nestjs/swagger";

export interface IErrorResponseDto {
	statusCode: number;
	message: string[] | string;
	error?: string;
}

export class InvalidRequestErrorDto implements IErrorResponseDto {
	@ApiProperty({ example: 400 })
	statusCode: number;

	@ApiProperty({ example: "Bad Request" })
	message: string[];

	@ApiProperty({ example: "Validation failed" })
	error: string;
}

export class ForbiddenRequestErrorDto implements IErrorResponseDto {
	@ApiProperty({ example: 403 })
	statusCode: number;

	@ApiProperty({ example: "Forbidden resource" })
	message: string;

	@ApiProperty({ example: "Forbidden" })
	error: string;
}

export class NotFoundErrorDto implements IErrorResponseDto {
	@ApiProperty({ example: 404 })
	statusCode: number;

	@ApiProperty({ example: "Not found" })
	message: string;
}
