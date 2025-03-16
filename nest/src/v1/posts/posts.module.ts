import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { PrismaModule } from "src/db/db.module";
import { PositiveIntVal } from "./validation.pipe";

@Module({
	imports: [PrismaModule],
	controllers: [PostsController],
	providers: [PostsService, PositiveIntVal],
})
export class PostsModule {}
