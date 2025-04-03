import { ConflictException, Injectable } from "@nestjs/common";
import { DbService } from "src/db/db.service";
import { Users } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
	InternalServerErrorException,
	UnauthorizedException,
} from "@nestjs/common";

@Injectable()
export class UsersService {
	constructor(private prisma: DbService) {}
	async getUsername(username: string): Promise<Users | null> {
		try {
			const result: Users | null = await this.prisma.users.findUnique({
				where: { username },
			});
			return result;
		} catch {
			throw new InternalServerErrorException();
		}
	}

	async getUserId(userId: number): Promise<Users | null> {
		try {
			return await this.prisma.users.findUnique({
				where: { id: userId },
			});
		} catch {
			throw new InternalServerErrorException();
		}
	}

	async signUser(username: string, password: string): Promise<Users> {
		try {
			const result: Users = await this.prisma.users.create({
				data: {
					username,
					password,
				},
			});
			return result;
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === "P2002"
			)
				throw new ConflictException(undefined, "Username is already taken");
			throw new InternalServerErrorException();
		}
	}

	async upgradeAccnt(userId: number) {
		try {
			return await this.prisma.users.update({
				where: { id: userId },
				data: { role: "POSTER" },
			});
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === "P2016"
			)
				throw new UnauthorizedException();
			throw new InternalServerErrorException();
		}
	}
}
