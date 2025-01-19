import { JwtPayload } from "jsonwebtoken";
import { $Enums } from "@prisma/client"

export interface IJwtPayload extends JwtPayload {
	username : string,
	password: string,
}

export interface IStatus {
	code: number,
	message?: string,
}

export interface ISignInResp extends IStatus {
	username: string,
	createdAt: Date,
	role : $Enums.Roles
}