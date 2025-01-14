import { Router } from "express";
import { baseController } from "#controllers/controller";

export const router : Router = Router();

router.use("/", baseController);

