import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

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
		const payload = { username, password, id: user.id, role: user.role };
		return { token: await this.jwtService.signAsync(payload) };
	}
}

//const payload: IJwtPayload = { username, password, id: user.id, role: user.role };
