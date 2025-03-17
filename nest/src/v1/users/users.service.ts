import { Injectable } from "@nestjs/common";
import { DbService } from "src/db/db.service";
import { Users } from "@prisma/client";
import { InternalServerErrorException } from "@nestjs/common";

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
}
