import { Router } from "express";

const accntRouter : Router = Router();


// TO DO: Implement controllers once passport is working. Also, allow becoming a poster user.
accntRouter.post("/log-in");
accntRouter.post("/sign-in");
accntRouter.get("/log-out");

export default accntRouter;