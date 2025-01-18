import { Router } from "express";
import { postLogIn, postSignIn } from "#controllers/accountControllers";

const accntRouter : Router = Router();


// TO DO: Implement controllers once passport is working. Also, allow becoming a poster user.
accntRouter.post("/log-in", postLogIn);
accntRouter.post("/sign-in", postSignIn);
accntRouter.get("/log-out");

export default accntRouter;