import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { JsonWebTokenError, JwtService, TokenExpiredError } from "@nestjs/jwt";
import { JwtPayload } from "../auth.dto";
import { RequestJwt } from "../auth.dto";
import { Reflector } from "@nestjs/core";
import { Roles } from "../auth.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private reflector: Reflector,
	) {}
	async canActivate(context: ExecutionContext) {
		const roles = this.reflector.get(Roles, context.getHandler());
		const request = context.switchToHttp().getRequest<RequestJwt>();
		const auth: string | undefined = request.headers.authorization;
		if (!auth) return false;
		try {
			request.user = await this.jwtService.verifyAsync<JwtPayload>(
				auth.split(" ")[1],
			);
			if (roles && request.user.role !== roles) return false;
			return true;
		} catch (error) {
			if (
				error instanceof JsonWebTokenError ||
				error instanceof TokenExpiredError
			)
				throw new UnauthorizedException();
		}
		return true;
	}
}
