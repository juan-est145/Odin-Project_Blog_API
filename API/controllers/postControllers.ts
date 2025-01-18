import { Posts, PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma: PrismaClient = new PrismaClient();

// TO DO: Query params must allow for how many posts to search, also it needs to set a default size. Consider caching
export async function getPostsCollection(req: Request, res: Response, next: NextFunction) {
	const posts: Posts[] = await prisma.posts.findMany({ where: { published: true } });
	return res.json({ posts });
}

// TO DO: Query params must allow for including comments or not. Consider caching
export async function getPost(req: Request, res: Response, next: NextFunction) {
	const post: Posts = await prisma.posts.findUnique({
		where: { id: req.params.postId },
		include: { comments: true }
	});
	return res.json({ post });
}

// TO DO: Allow for creating new posts
export async function postPost(req: Request, res: Response, next: NextFunction) {
	return res.json({});
}

// TO DO: Allow posting comments
export async function postComment(req: Request, res: Response, next: NextFunction) {
	return res.json({});
}