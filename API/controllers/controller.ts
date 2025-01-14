import { Request, Response, NextFunction } from "express";

export function baseController(req : Request, res: Response, next: NextFunction) {
	return res.json({ message: "Hola caracola"});
}