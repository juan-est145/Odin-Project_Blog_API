export interface IErrorResponseDto {
	statusCode: number;
	message: string[] | string;
	error?: string;
}
