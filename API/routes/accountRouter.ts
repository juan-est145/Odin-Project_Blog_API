import { Router } from "express";
import { postLogIn, postSignIn, valSignIn, valLogIn, upgradeAccnt, valUpgrade } from "#controllers/accountControllers";
import passport from "passport";

const accntRouter: Router = Router();

accntRouter.post("/sign-in", valSignIn, postSignIn);
accntRouter.post("/log-in", valLogIn, postLogIn);
accntRouter.post("/upgrade", passport.authenticate("jwt", { session: false }), valUpgrade, upgradeAccnt);

export default accntRouter;