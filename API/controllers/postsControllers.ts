import { Comments, Posts } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import queries from "#db/queries.js";
import {
	IDeleteCommentReqParams,
	IDeletePostReqParams,
	IGetPostReqParams,
	IGetPostReqQuery,
	IJwtPayload,
	IPostCommentReqBody,
	IPostCommentReqParams,
	IPostPostReqBody,
	IStatus,
} from "#types/types.js";
import { Result, ValidationChain, ValidationError, body, param, query, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

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

export const postCommentVal: ValidationChain[] = [
	param("postId").isUUID().withMessage("Invalid route"),
	body("text").trim()
		.isLength({ min: 1, max: 8362 }).withMessage("Comment length must be between 1 and 8362 characters"),
];

export const deletePostVal: ValidationChain[] = [
	param("postId").isUUID().withMessage("Invalid route"),
];

export const deleteCommentVal: ValidationChain[] = [
	param("postId").isUUID().withMessage("Invalid post id"),
	param("commentId").isUUID().withMessage("Invalid comment id"),
];

// TO DO: Query params must allow for how many posts to search, also it needs to set a default size. Consider caching
/**
 * @swagger
 * /posts:
 *  get:
 *   description: Hola caracola
 *   responses:
 *    "200":
 *     description: Returns a collection of posts
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/definitions/IPosts'
 */
export async function getPostsCollection(req: Request, res: Response, next: NextFunction) {
	try {
		// TO DO: Later add number of posts to retrieve to second parameter
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
			notFound.message = errors.array();
			return errors.array()[0].msg === "Invalid route" ? res.status(404).json(notFound) : res.status(400).json(notFound);
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
		const invalidReq: IStatus = {
			code: 400,
		}
		const valErrors: Result<ValidationError> = validationResult(req);
		if (!valErrors.isEmpty()) {
			invalidReq.message = valErrors.array();
			return res.status(400).json(invalidReq);
		}
		let authHeader: string | undefined = req.headers.authorization;
		const userCred: IJwtPayload = jwt.verify(authHeader?.split(" ")[1] as string, process.env.SECRET as string) as IJwtPayload;
		if (userCred.role !== "POSTER") {
			invalidReq.code = 403;
			invalidReq.message = "Not authorized";
			return res.status(403).json(invalidReq);
		}
		let { title, subtitle, text } = req.body;
		let publish = req.body.published === "true" ? true : false;
		const post: Posts = await queries.createPost(userCred.id, title, subtitle, text, publish);
		return res.json(post);
	} catch (error) {
		console.error(error);
		next(error);
	}
}

export async function deletePost(req: Request<IDeletePostReqParams>, res: Response, next: NextFunction) {
	try {
		const invalidReq: IStatus = {
			code: 400,
		}
		const errors: Result<ValidationError> = validationResult(req);
		if (!errors.isEmpty()) {
			invalidReq.message = errors.array();
			return res.status(400).json(invalidReq);
		}
		let authHeader: string | undefined = req.headers.authorization;
		const userCred: IJwtPayload = jwt.verify(authHeader?.split(" ")[1] as string, process.env.SECRET as string) as IJwtPayload;
		const result: Posts = await queries.deletePost(req.params.postId, userCred.id);
		return (res.json(result));
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
			const invalidReq: IStatus = {
				code: 403,
				message: "Not authorized",
			};
			return res.status(403).json(invalidReq);
		}
		console.error(error);
		next(error);
	}
}

export async function postComment(req: Request<IPostCommentReqParams, {}, IPostCommentReqBody>, res: Response, next: NextFunction) {
	try {
		const invalidReq: IStatus = {
			code: 400,
		};
		const valErrors: Result<ValidationError> = validationResult(req);
		if (!valErrors.isEmpty()) {
			invalidReq.message = valErrors.array();
			return res.status(400).json(invalidReq);
		}
		const post: Posts | null = await queries.getPost(req.params.postId, true);
		if (!post) {
			const message: ValidationError = {
				type: "field",
				value: req.params.postId,
				msg: "Invalid route",
				path: "postId",
				location: "params",
			};
			return res.status(400).json(message);
		}
		let authHeader: string | undefined = req.headers.authorization;
		const userCred: IJwtPayload = jwt.verify(authHeader?.split(" ")[1] as string, process.env.SECRET as string) as IJwtPayload;
		const result: Comments = await queries.postComment(userCred.id, req.params.postId, req.body.text);
		return res.json(result);
	} catch (error) {
		console.error(error);
		next(error);
	}
}

export async function deleteComment(req: Request<IDeleteCommentReqParams>, res: Response, next: NextFunction) {
	try {
		const invalidReq: IStatus = {
			code: 400,
		}
		const valErrors: Result<ValidationError> = validationResult(req);
		if (!valErrors.isEmpty()) {
			invalidReq.message = valErrors.array();
			return res.status(400).json(invalidReq);
		}
		let authHeader: string | undefined = req.headers.authorization;
		const userCred: IJwtPayload = jwt.verify(authHeader?.split(" ")[1] as string, process.env.SECRET as string) as IJwtPayload;
		const result: Comments = await queries.deleteComment(req.params.commentId, userCred.id);
		return res.json(result);
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
			const invalidReq: IStatus = {
				code: 403,
				message: "Not authorized",
			};
			return res.status(403).json(invalidReq);
		}
		console.error(error);
		next(error);
	}
}