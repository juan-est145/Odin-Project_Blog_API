import { Module } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { PrismaModule } from "src/db/db.module";

@Module({
	imports: [PrismaModule],
	providers: [CommentsService],
	exports: [CommentsService],
})
export class CommentsModule {}
