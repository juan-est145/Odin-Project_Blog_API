import { Router } from "express";
import { postLogIn, postSignIn, test } from "#controllers/accountControllers";
import passport from "passport";

const accntRouter: Router = Router();


// TO DO: Implement controllers once passport is working. Also, allow becoming a poster user.
accntRouter.post("/log-in", postLogIn);
accntRouter.get("/log-in/test", passport.authenticate("jwt", { session: false }), test);
accntRouter.post("/sign-in", postSignIn);
accntRouter.get("/log-out");

export default accntRouter;