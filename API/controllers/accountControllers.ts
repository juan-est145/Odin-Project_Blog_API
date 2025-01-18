import { Users } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs"
import queries from "#db/queries";
import jwt from "jsonwebtoken";
import { jwtPayload } from "#types/types.js";

export async function postSignIn(req : Request, res: Response, next: NextFunction) {
	try {
		// TO DO: Implement input validation
		const password = await bcrypt.hash(req.body.password, 10);
		const newUser: Users = await queries.postUser(req.body.username, password);
		const response = {
			username : newUser.username,
			createdAt: newUser.createdAt,
			role: newUser.role,
		}
		// Maybe later implement direct log in
		return (res.status(200).json(response));
	} catch (error) {
		//TO DO: Handle errors
	}
}

export async function postLogIn(req : Request, res: Response, next: NextFunction) {
	// TO DO: Implement input validation
	try {
		const payload : jwtPayload = {
			username : req.body.username,
			password : req.body.password,
		}
		const token : string = jwt.sign(payload, process.env.SECRET as string, { algorithm: "HS256", expiresIn: "14d" });
		//res.setHeader("Authorization", `Bearer ${token}`);
		return res.json(token);
	} catch (error) {
		
	}
}

export function test(req : Request, res: Response, next: NextFunction) {
	res.json({ message: "All good"});
}