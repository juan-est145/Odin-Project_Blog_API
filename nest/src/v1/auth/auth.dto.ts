import { $Enums } from "@prisma/client";
import { IsString, IsStrongPassword, Length } from "class-validator";

export class LogInDto {
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

export class JwtPayloadd {
	username: string;
	id: number;
	role: $Enums.Roles;
}
