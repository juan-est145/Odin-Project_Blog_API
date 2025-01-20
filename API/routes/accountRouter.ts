import { Router } from "express";
import { postLogIn, postSignIn, valSignIn, test, valLogIn } from "#controllers/accountControllers";
import passport from "passport";

const accntRouter: Router = Router();

// TO DO: Allow becoming a poster user.
accntRouter.post("/sign-in", valSignIn, postSignIn);
accntRouter.post("/log-in", valLogIn, postLogIn);
accntRouter.get("/log-in/test", passport.authenticate("jwt", { session: false }), test);

export default accntRouter;