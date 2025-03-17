import { Module, ValidationPipe, ValidationPipeOptions } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PrismaModule } from "src/db/db.module";
import { APP_PIPE } from "@nestjs/core";

const validationPipeOpts: ValidationPipeOptions = {
	whitelist: true,
	forbidNonWhitelisted: true,
	transform: true,
	transformOptions: {
		enableImplicitConversion: true,
	},
};

@Module({
	imports: [PrismaModule],
	providers: [
		UsersService,
		{
			provide: APP_PIPE,
			useValue: new ValidationPipe(validationPipeOpts),
		},
	],
	exports: [UsersService],
})
export class UsersModule {}
