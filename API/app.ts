import 'module-alias/register';
import express, { Application } from "express";
import postRouter from "#routes/postsRouter";
import dotenv from "dotenv";
import accntRouter from "#routes/accountRouter";

// TO DO: Implement helmet and maybe a cache middleware
// TO DO: Implement errors messages. 404 and 500. Do so with an interface object.
// TO DO: Implement CORS.

dotenv.config();
const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

app.use("/posts", postRouter);
app.use("/account", accntRouter);

app.listen(process.env.PORT, () => console.log("Server listening on port 3000"));