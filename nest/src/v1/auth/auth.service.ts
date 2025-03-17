import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { JwtPayloadd } from "./auth.dto";

@Injectable()
export class AuthService {
	constructor(
		private users: UsersService,
		private jwtService: JwtService,
	) {}
	async logIn(username: string, password: string) {
		const user = await this.users.getUsername(username);
		if (!user || !(await bcrypt.compare(password, user.password)))
			return new UnauthorizedException();
		const payload: JwtPayloadd = { username, id: user.id, role: user.role };
		return { token: await this.jwtService.signAsync(payload) };
	}
	async signIn(username: string, password: string) {
		const passwordHash: string = await bcrypt.hash(password, 10);
		await this.users.signUser(username, passwordHash);
	}
}
