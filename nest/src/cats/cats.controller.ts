import { Body, Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { Response } from "express";
import { CatsDto } from "./cats.dto/cats.dto";
import { CatsService } from "./cats.service";

@Controller("cats")
export class CatsController {
	constructor(private catsService: CatsService) {}

	@Get()
	findAll(@Req() request: Request): string {
		return `This action returns all cats. Hello from ${request.url}`;
	}
	@Get("/oneCat")
	findOneCat(): string {
		return "You found one specific cat";
	}
	@Get("/oneCat/:id")
	findCatId(@Param("id") param: number): string {
		return `Your cat id is ${param}`;
	}
	@Post()
	create(@Res() res: Response, @Body() body: CatsDto): void {
		this.catsService.create(body);
		console.log(this.catsService.findAll());
		res.status(201).send("This action creates a cat");
	}
}
