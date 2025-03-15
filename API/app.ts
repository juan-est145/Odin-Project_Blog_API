import "./swagger";
import express, { Application, NextFunction, Request, Response } from "express";
import { IStatus } from '#types/general/types.js';
import postRouter from "#routes/postsRouter";
import dotenv from "dotenv";
import accntRouter from "#routes/accountRouter";
import "#auth/passport";
import cors from "cors";
import swaggerui from "swagger-ui-express";
import openapiSpecification from "./swagger";

// TO DO: Implement helmet and maybe a cache middleware
// TO DO: Implement CORS.

dotenv.config();
const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

// TO DO: This is only temporary, it should later diferentiate between dev mode and prod mode
app.use(cors());
app.use("/docs", swaggerui.serve, swaggerui.setup(openapiSpecification));
app.use("/posts", postRouter);
app.use("/account", accntRouter);

app.use((req: Request, res: Response) => {
	const response: IStatus = {
		message: `Route ${req.url} does not exist`,
		code: 404,
	}
	res.status(404).json(response);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	const response: IStatus = {
		message: "Internal server error",
		code: 500,
	}
	res.status(500).json(response);
});

app.listen(process.env.PORT, () => console.log("Server listening on port 3000"));