import { Body, Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { Response } from "express";
import { CatsDto } from "./cats.dto/cats.dto";

@Controller("cats")
export class CatsController {
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
		console.log(body.breed);
		res.status(201).send("This action creates a cat");
	}
}
