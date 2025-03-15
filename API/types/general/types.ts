import { JwtPayload } from "jsonwebtoken";
import { $Enums, Posts } from "@prisma/client"
import { ValidationError } from "express-validator";

type TMessageError = string | string[] | ValidationError[];

export interface IJwtPayload extends JwtPayload {
	username: string,
	password: string,
	id: number,
	role: $Enums.Roles
}

export interface IStatus {
	code: number,
	message?: TMessageError,
}

export interface ISignInResp extends IStatus {
	username: string,
	createdAt: Date,
	role: $Enums.Roles
}

export interface IAccountReqBody {
	username: string,
	password: string,
}

