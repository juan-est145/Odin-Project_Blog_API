import { Users } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs"
import queries from "#db/queries";
import jwt from "jsonwebtoken";
import { jwtPayload, signInResp, status } from "#types/types.js";
import { body, Result, ValidationChain, ValidationError, validationResult } from "express-validator";

export const valSignIn: ValidationChain[] = [
	body("username").trim()
		.isLength({ min: 5, max: 40 }).withMessage("Username must have a length of between 5 and 40 characters"),
	body("password").trim()
		.isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
		.withMessage("Password must have at least a minimum length of 8 and at least one of each of the following character types: lowercase, uppercase, number and special symbol symbol"),
];

export async function postSignIn(req: Request, res: Response, next: NextFunction) {
	try {
		const errors: Result<ValidationError> = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json(errors.array());
		const password: string = await bcrypt.hash(req.body.password, 10);
		const newUser: Users = await queries.postUser(req.body.username, password);
		const response: signInResp = {
			code: 200,
			username: newUser.username,
			createdAt: newUser.createdAt,
			role: newUser.role,
		}
		// Maybe later implement direct log in
		return (res.status(200).json(response));
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
			const response: ValidationError = {
				type: "field",
				value: req.body.username,
				path: "username",
				msg: "Username is already taken",
				location: "body",
			}
			return res.status(400).json([response]);
		}
		console.error(error);
		next(error);
	}
}


export async function postLogIn(req: Request, res: Response, next: NextFunction) {
	// TO DO: Implement input validation
	try {
		const { username, password } = req.body;
		const user: Users | null = await queries.getUsername(username);
		if (!user || !await bcrypt.compare(password, user.password))
			return res.status(401).json("Invalid credentials");
		const payload: jwtPayload = {
			username,
			password,
		}
		const token: string = jwt.sign(payload, process.env.SECRET as string, { algorithm: "HS256", expiresIn: "14d" });
		return res.json(token);
	} catch (error) {
		console.error(error);
		next(error);
	}
}

export function test(req: Request, res: Response, next: NextFunction) {
	res.json({ message: "All good" });
}