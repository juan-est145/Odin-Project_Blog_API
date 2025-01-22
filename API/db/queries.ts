import { Posts, Users, PrismaClient, Comments } from "@prisma/client";

const prisma = new PrismaClient();

async function getUsername(username: string) {
	try {
		const result: Users | null = await prisma.users.findUnique({ where: { username } });
		return (result);
	} catch (error) {
		throw (error);
	}
}

async function postUser(username: string, password: string) {
	try {
		const result: Users = await prisma.users.create({ data: { username, password } });
		return (result);
	} catch (error) {
		throw (error);
	}
}

async function getPost(id: string, published: boolean = true, nmbOfCmments: number = 10) {
	try {
		nmbOfCmments = nmbOfCmments < 0 ? nmbOfCmments * -1 : nmbOfCmments;
		const result: Posts | null = await prisma.posts.findUnique({
			where: { id, published },
			include: {
				comments: {
					take: nmbOfCmments,
					orderBy: { updatedAt: "desc" },
				},
			},
		});
		return (result);
	} catch (error) {
		throw (error);
	}
}

async function getPosts(published: boolean = true, nmbOfPosts: number = 10) {
	try {
		nmbOfPosts = nmbOfPosts < 0 ? nmbOfPosts * -1 : nmbOfPosts;
		const result: Posts[] | null = await prisma.posts.findMany({
			where: { published },
			take: nmbOfPosts,
			orderBy: { updatedAt: "desc" },
		});
		return (result);
	} catch (error) {
		throw (error);
	}
}

async function createPost(userId: number, title: string, subtitle: string | undefined = undefined, text: string, publish: boolean = false) {
	try {
		const result: Posts | null = await prisma.posts.create({
			data: { userId, title, subtitle, text, published: publish }
		});
		return (result);
	} catch (error) {
		throw (error);
	}
}

async function deletePost(id: string, userId: number) {
	try {
		const result: Posts | null = await prisma.posts.delete({
			where: { id, userId }
		});
		return (result);
	} catch (error) {
		throw (error);
	}
}

async function postComment(userId: number, postId: string, text: string) {
	try {
		const result: Comments = await prisma.comments.create({
			data: { userId, postId, text }
		});
		return (result);
	} catch (error) {
		throw (error);
	}
}

async function deleteComment(id: string, userId: number) {
	try {
		const result: Comments = await prisma.comments.delete({
			where: { id, userId }
		});
		return (result);
	} catch (error) {
		throw (error);
	}
}

const queries = {
	getUsername,
	postUser,
	getPost,
	getPosts,
	createPost,
	deletePost,
	postComment,
	deleteComment,
}

export default queries;