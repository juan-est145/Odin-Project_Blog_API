import { Module } from "@nestjs/common";
import { AccntService } from "./accnt.service";
import { AccntController } from "./accnt.controller";
import { CommentsModule } from "../comments/comments.module";
import { PostsModule } from "../posts/posts.module";
import { UsersModule } from "../users/users.module";

@Module({
	imports: [CommentsModule, PostsModule, UsersModule],
	providers: [AccntService],
	controllers: [AccntController],
})
export class AccntModule {}
