import { Module } from "@nestjs/common";
import { AccntService } from "./accnt.service";
import { AccntController } from "./accnt.controller";
import { CommentsModule } from "../comments/comments.module";

@Module({
	imports: [CommentsModule],
	providers: [AccntService],
	controllers: [AccntController],
})
export class AccntModule {}
