import passport, { DoneCallback } from "passport";
import { Strategy as JwtStrategy, StrategyOptionsWithSecret, ExtractJwt }  from "passport-jwt";
import queries from "#db/queries";
import { Users } from "@prisma/client";
import { IJwtPayload } from "#types/general/types.js";
import bcrypt from "bcryptjs";

const optns : StrategyOptionsWithSecret = {
	secretOrKey: process.env.SECRET as string,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	algorithms: ["HS256"],
};

passport.use("jwt", new JwtStrategy(optns, async (payload : IJwtPayload, done : DoneCallback) => {
	try {
		const user : Users | null = await queries.getUsername(payload.username);
		if (!user)
			return done(null, false);
		const passMatch = await bcrypt.compare(payload.password, user.password);
		if (!passMatch)
			return done(null, false);
		return done(null, user);
	} catch (error) {
		console.error(error);
		return done(error);
	}
}));