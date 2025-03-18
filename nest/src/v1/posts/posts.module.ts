import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { PrismaModule } from "src/db/db.module";
import { CommentsModule } from "../comments/comments.module";

@Module({
	imports: [PrismaModule, CommentsModule],
	controllers: [PostsController],
	providers: [PostsService],
})
export class PostsModule {}
