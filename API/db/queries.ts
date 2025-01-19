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

async function getPost(id: string, published: boolean = true, nmbOfcmments: number = 10) {
	try {
		nmbOfcmments = nmbOfcmments < 0 ? nmbOfcmments * -1 : nmbOfcmments;
		const result: Posts | null = await prisma.posts.findUnique({
			where: { id, published },
			include: {
				comments: {
					take: nmbOfcmments,
					orderBy: { createdAt: "desc" },
				},
			},
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
}

export default queries;