import { Posts, Users, PrismaClient } from "@prisma/client";

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

const queries = {
	getUsername,
	postUser,
	getPost,
	getPosts,
	createPost,
}

export default queries;