import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { JsonWebTokenError, JwtService, TokenExpiredError } from "@nestjs/jwt";
import { JwtPayload } from "../auth.dto";
import { RequestJwt } from "../auth.dto";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}
	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest<RequestJwt>();
		const auth: string | undefined = request.headers.authorization;
		if (!auth) return false;
		try {
			request.user = await this.jwtService.verifyAsync<JwtPayload>(
				auth.split(" ")[1],
			);
			return true;
		} catch (error) {
			if (error instanceof JsonWebTokenError || TokenExpiredError)
				throw new UnauthorizedException();
		}
		return true;
	}
}
