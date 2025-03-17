import { Body, Controller, Post, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LogInDto } from "./auth.dto";

@Controller()
export class AuthController {
	constructor(private auth: AuthService) {}
	@Get()
	ping() {
		return "pong";
	}
	@Post("log-in")
	async logIn(@Body() body: LogInDto) {
		return await this.auth.logIn(body.username, body.password);
	}
}
