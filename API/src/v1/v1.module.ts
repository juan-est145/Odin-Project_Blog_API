import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { PostsModule } from "./posts/posts.module";
import { PrismaModule } from "src/db/db.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { CommentsModule } from "./comments/comments.module";

@Module({
	imports: [
		PostsModule,
		PrismaModule,
		AuthModule,
		UsersModule,
		RouterModule.register([
			{
				path: "v1",
				children: [
					{
						path: "posts",
						module: PostsModule,
					},
					{
						path: "auth",
						module: AuthModule,
					},
				],
			},
		]),
		CommentsModule,
	],
})
export class V1Module {}
