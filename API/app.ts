import express, { Application } from "express";
import  postRouter from "#routes/postsRouter";
import "dotenv/config";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

app.use("/posts", postRouter);

app.listen(process.env.PORT, () => console.log("Server listening on port 3000"));