import { IsInt, IsOptional, IsPositive } from "class-validator";

export class QueryGetPostsDto {
	@IsOptional()
	@IsInt()
	@IsPositive()
	nmbOfPosts?: number;
}
