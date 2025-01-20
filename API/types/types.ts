import { JwtPayload } from "jsonwebtoken";
import { $Enums } from "@prisma/client"

export interface IJwtPayload extends JwtPayload {
	username: string,
	password: string,
	id: number,
	role: $Enums.Roles
}

export interface IStatus {
	code: number,
	message?: string,
}

export interface ISignInResp extends IStatus {
	username: string,
	createdAt: Date,
	role: $Enums.Roles
}

export interface IGetPostReqParams {
	postId: string,
}

export interface IGetPostReqQuery {
	nmbOfCmments?: string,
}

export interface IAccountReqBody {
	username: string,
	password: string,
}

export interface IPostPostReqBody {
	title: string,
	subtitle?: string,
	text: string,
	published?: boolean,
}