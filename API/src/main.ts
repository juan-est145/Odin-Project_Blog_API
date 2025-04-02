import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe, ValidationPipeOptions } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.enableCors({
		origin: ["http://localhost:5173", "http://localhost:5174"],
	});
	const valPipeOpts: ValidationPipeOptions = {
		whitelist: true,
		forbidNonWhitelisted: true,
		transform: true,
		transformOptions: {
			enableImplicitConversion: true,
		},
	};
	const config = new DocumentBuilder()
		.setTitle("Blog API")
		.setDescription("A REST API for a blog. Part of the Odin Project")
		.setVersion("1.0")
		.addBearerAuth()
		.build();
	SwaggerModule.setup("/docs", app, SwaggerModule.createDocument(app, config), {
		jsonDocumentUrl: "/docs/json",
	});
	app.useGlobalPipes(new ValidationPipe(valPipeOpts));
	await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
	console.error("Error during bootstrap:", err);
});
