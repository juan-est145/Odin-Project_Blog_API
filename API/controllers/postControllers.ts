import { Posts } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import queries from "#db/queries.js";
import { IGetPostReqParams, IGetPostReqQuery, IJwtPayload, IPostPostReqBody, IStatus } from "#types/types.js";
import { Result, ValidationChain, ValidationError, param, query, validationResult } from "express-validator";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

export const getPostVal: ValidationChain[] = [
	param("postId").isUUID().withMessage("Invalid route"),
	query("nmbOfCmments").optional({ values: "undefined" }).isNumeric({ no_symbols: true })
		.withMessage("nmbOfCmments parameter must be a number"),
];

// TO DO: Query params must allow for how many posts to search, also it needs to set a default size. Consider caching
export async function getPostsCollection(req: Request, res: Response, next: NextFunction) {
	try {
		//Later add number of posts to retrieve to second parameter
		const posts: Posts[] = await queries.getPosts(true);
		return res.json(posts);
	} catch (error) {
		console.error(error);
		next(error);
	}
}

// TO DO: Consider caching
export async function getPost(req: Request<IGetPostReqParams, {}, {}, IGetPostReqQuery>, res: Response, next: NextFunction) {
	try {
		const notFound: IStatus = {
			code: 404,
			message: "Post id not found",
		};
		const errors: Result<ValidationError> = validationResult(req);
		if (!errors.isEmpty()) {
			notFound.message = "Invalid post id";
			return errors.array()[0].msg === "Invalid route" ? res.status(404).json(notFound) : res.status(400).json(errors.array());
		}
		const post: Posts | null = await queries.getPost(req.params.postId, true, req.query.nmbOfCmments ? +req.query.nmbOfCmments : undefined);
		return post ? res.json(post) : res.status(404).json(notFound);
	} catch (error) {
		console.error(error);
		next(error);
	}
}

export async function postPost(req: Request<{}, {}, IPostPostReqBody>, res: Response, next: NextFunction) {
	try {
		let authHeader: string | undefined = req.headers.authorization;
		const userCred: IJwtPayload = jwt.verify(authHeader?.split(" ")[1] as string, process.env.SECRET as string) as IJwtPayload;
		const { title, subtitle, text } = req.body;
		// TO DO: Add a check to see if published value should be true or false
		const post: Posts = await queries.createPost(userCred.id, title, subtitle, text);
		return res.json(post);
	} catch (error) {
		console.error(error);
		next(error);
	}
}

// TO DO: Allow posting comments
export async function postComment(req: Request, res: Response, next: NextFunction) {
	return res.json({});
}