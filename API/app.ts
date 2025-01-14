import express, { Application } from "express";
import { router } from "#routes/router";
import "dotenv/config";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

app.use("/", router);

app.listen(process.env.PORT, () => console.log("Server listening on port 3000"));