import { JwtPayload } from "jsonwebtoken";

export interface jwtPayload extends JwtPayload {
	username : string,
	password: string,
}