import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { RequestJwt } from "../auth/auth.dto";

export const User = createParamDecorator(
	(data: string, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest<RequestJwt>();
		if (!request.user)
			throw Error("This decorator must be used in a auth route");
		const user = request.user;
		return data && typeof data === "string" && data in user
			? user[data as keyof typeof user]
			: user;
	},
);
