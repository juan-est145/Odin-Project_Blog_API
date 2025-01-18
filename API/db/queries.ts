import { Posts, Users, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getUsername(username: string) {
	try {
		const result : Users | null = await prisma.users.findUnique({ where: { username }});
		return (result);
	} catch (error) {
		throw (error);
	}
}

async function postUser(username: string, password: string) {
	try {
		const result : Users = await prisma.users.create({ data: { username, password }});
		return (result);
	} catch (error) {
		throw (error);
	}
}

const queries = {
	getUsername,
	postUser,
}

export default queries;