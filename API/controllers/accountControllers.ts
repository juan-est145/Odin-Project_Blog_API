import { Users } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs"
import queries from "#db/queries";

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
		
	} catch (error) {
		
	}
}