import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constant";
import { AuthGuard } from "./guard/auth.guard";

@Module({
	imports: [
		UsersModule,
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret,
			signOptions: { expiresIn: "7d" },
			verifyOptions: { algorithms: ["HS256"] },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, AuthGuard],
})
export class AuthModule {}
