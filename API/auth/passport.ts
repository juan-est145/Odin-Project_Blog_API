import passport from "passport";
import { Strategy as JwtStrategy, StrategyOptionsWithSecret, ExtractJwt }  from "passport-jwt";
import queries from "#db/queries";

const optns : StrategyOptionsWithSecret = {
	secretOrKey: process.env.SECRET as string,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	algorithms: ["HS256"],
	
};

passport.use(new JwtStrategy(optns, async (payload, done) => {
	queries.getUsername("Something");
}));