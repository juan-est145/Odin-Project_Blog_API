import 'module-alias/register';
import express, { Application, NextFunction, Request, Response } from "express";
import { IStatus } from '#types/types.js';
import postRouter from "#routes/postsRouter";
import dotenv from "dotenv";
import accntRouter from "#routes/accountRouter";
import "#auth/passport";

// TO DO: Implement helmet and maybe a cache middleware
// TO DO: Implement CORS.

dotenv.config();
const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

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