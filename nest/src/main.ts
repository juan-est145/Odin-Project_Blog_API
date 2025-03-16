import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	const config = new DocumentBuilder()
		.setTitle("Blog API")
		.setDescription("A REST API for a blog. Part of the Odin Project")
		.setVersion("1.0")
		.build();
	SwaggerModule.setup("/docs", app, SwaggerModule.createDocument(app, config), {
		jsonDocumentUrl: "/docs/json",
	});
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
	console.error("Error during bootstrap:", err);
});
