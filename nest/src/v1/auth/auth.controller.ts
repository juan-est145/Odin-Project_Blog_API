import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
	LogInBadRequestDto,
	LogInBodyDto,
	LogInResDto,
	LogInUnauthorizedDto,
} from "./auth.dto";
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiUnauthorizedResponse,
} from "@nestjs/swagger";

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
}
