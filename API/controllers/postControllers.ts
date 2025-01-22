import { Posts } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import queries from "#db/queries.js";
import { IGetPostReqParams, IGetPostReqQuery, IJwtPayload, IPostPostReqBody, IStatus } from "#types/types.js";
import { Result, ValidationChain, ValidationError, body, param, query, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const getPostVal: ValidationChain[] = [
	param("postId").isUUID().withMessage("Invalid route"),
	query("nmbOfCmments").optional({ values: "undefined" }).isNumeric({ no_symbols: true })
		.withMessage("nmbOfCmments parameter must be a number"),
];

export const postPostVal: ValidationChain[] = [
	body("title").trim()
		.isLength({ min: 1, max: 255 }).withMessage("Title must have a length between 1 and 255 characters"),
	body("subtitle").optional({ values: "undefined" }).trim()
		.isLength({ min: 1, max: 255 }).withMessage("If there is a subtitle, it must have a lengtt between 1 and 255 characters"),
	body("text").trim()
		.isLength({ min: 1, max: 16724 }).withMessage("Text must have a length between 1 and 16724 characters"),
	body("published").optional({ values: "undefined" }).trim()
		.isIn(["true", "false"]).withMessage("If published field is given, it must be a string of either true or false"),
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

// TO DO: Add parameter validation to body and auth header
export async function postPost(req: Request<{}, {}, IPostPostReqBody>, res: Response, next: NextFunction) {
	try {
		const invalidBody: IStatus = {
			code: 400,
		}
		const valErrors: Result<ValidationError> = validationResult(req);
		if (!valErrors.isEmpty()) {
			invalidBody.message = valErrors.array();
			return res.status(400).json(invalidBody);
		}
		let authHeader: string | undefined = req.headers.authorization;
		const userCred: IJwtPayload = jwt.verify(authHeader?.split(" ")[1] as string, process.env.SECRET as string) as IJwtPayload;
		let { title, subtitle, text } = req.body;
		let publish = req.body.published === "true" ? true : false;
		const post: Posts = await queries.createPost(userCred.id, title, subtitle, text, publish);
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