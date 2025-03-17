import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { JsonWebTokenError, JwtService, TokenExpiredError } from "@nestjs/jwt";
import { Request } from "express";
import { JwtPayloadd } from "../auth.dto";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}
	async canActivate(context: ExecutionContext) {
		const request: Request = context.switchToHttp().getRequest<Request>();
		const auth: string | undefined = request.headers.authorization;
		if (!auth) return false;
		try {
			await this.jwtService.verifyAsync<JwtPayloadd>(auth.split(" ")[1]);
			return true;
		} catch (error) {
			if (error instanceof JsonWebTokenError || TokenExpiredError)
				throw new UnauthorizedException();
		}
		return true;
	}
}
