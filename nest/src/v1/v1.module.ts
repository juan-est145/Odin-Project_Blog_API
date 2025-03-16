import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { PostsModule } from "./posts/posts.module";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
	imports: [
		PostsModule,
		PrismaModule,
		RouterModule.register([
			{
				path: "v1",
				module: PostsModule,
			},
		]),
	],
})
export class V1Module {}
