import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
	LogInBadRequestDto,
	LogInBodyDto,
	LogInResDto,
	LogInUnauthorizedDto,
	SignInBadRequestDto,
	SignInBodyDto,
	SignInConflictResponseDto,
	SignInResDto,
} from "./auth.dto";
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Users } from "@prisma/client";

@Controller()
export class AuthController {
	constructor(private auth: AuthService) {}
	@Post("log-in")
	@ApiCreatedResponse({
		description: "It returns an object with a token jwt property",
		type: LogInResDto,
	})
	@ApiBadRequestResponse({
		description:
			"Returns messages describing the invalid fields of the request",
		type: LogInBadRequestDto,
	})
	@ApiUnauthorizedResponse({
		description: "Returns when invalid credentials are entered",
		type: LogInUnauthorizedDto,
	})
	async logIn(@Body() body: LogInBodyDto) {
		return await this.auth.logIn(body.username, body.password);
	}

	@ApiCreatedResponse({
		description: "Returns the registered username and the status code",
		type: SignInResDto,
	})
	@ApiBadRequestResponse({
		description:
			"Returns messages describing the invalid fields of the request",
		type: SignInBadRequestDto,
	})
	@ApiConflictResponse({
		description: "If username already exists, returns this error code",
		type: SignInConflictResponseDto,
	})
	@Post("/sign-in")
	async signIn(@Body() body: SignInBodyDto) {
		const result: Users = await this.auth.signIn(body.username, body.password);
		return {
			username: result.username,
			statusCode: 201,
		} satisfies SignInResDto;
	}
}
