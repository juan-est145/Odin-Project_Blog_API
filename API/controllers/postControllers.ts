import { Posts, PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma : PrismaClient = new PrismaClient();

export async function getPostsCollection(req: Request, res : Response, next : NextFunction) {
	const posts : Posts[] = await prisma.posts.findMany({ where: { published: true }});
	return res.json({ posts });
}

export async function getPost(req: Request, res : Response, next : NextFunction) {
	const post : Posts = await prisma.posts.findUnique({
		where: { id: req.params.postId },
		include : { comments: true }
	});
	return res.json({ post });
}