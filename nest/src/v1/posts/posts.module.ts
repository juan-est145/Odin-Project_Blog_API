import { Module, ValidationPipe, ValidationPipeOptions } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
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
	controllers: [PostsController],
	providers: [
		PostsService,
		{
			provide: APP_PIPE,
			useValue: new ValidationPipe(validationPipeOpts),
		},
	],
})
export class PostsModule {}
