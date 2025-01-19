import { Posts } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import queries from "#db/queries.js";
import { IGetPostReqParams, IGetPostReqQuery, IStatus } from "#types/types.js";
import { Result, ValidationChain, ValidationError, param, query, validationResult } from "express-validator";

export const getPostVal: ValidationChain[] = [
	param("postId").isUUID().withMessage("Invalid route"),
	query("nmbOfCmments").optional({ values: "undefined" }).isNumeric({ no_symbols: true })
		.withMessage("nmbOfCmments parameter must be a number"),
];

// TO DO: Query params must allow for how many posts to search, also it needs to set a default size. Consider caching
export async function getPostsCollection(req: Request, res: Response, next: NextFunction) {
	// const posts: Posts[] = await prisma.posts.findMany({ where: { published: true } });
	// return res.json(posts);
	return res.json({});
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
		const post: Posts | null = await queries.getPost(req.params.postId, true, req.query.nmbOfCmments? +req.query.nmbOfCmments : undefined);
		return post ? res.json(post) : res.status(404).json(notFound);
	} catch (error) {
		console.error(error);
		next(error);
	}
}

// TO DO: Allow for creating new posts
export async function postPost(req: Request, res: Response, next: NextFunction) {
	return res.json({});
}

// TO DO: Allow posting comments
export async function postComment(req: Request, res: Response, next: NextFunction) {
	return res.json({});
}