import { JwtPayload } from "jsonwebtoken";
import { $Enums } from "@prisma/client"

export interface jwtPayload extends JwtPayload {
	username : string,
	password: string,
}

export interface status {
	code: number,
	message?: string,
}

export interface signInResp extends status {
	username: string,
	createdAt: Date,
	role : $Enums.Roles
}