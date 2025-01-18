import { Router } from "express";
import { getPostsCollection, getPost } from "#controllers/postControllers";

const postRouter : Router = Router();


postRouter.get("/", getPostsCollection);

// The /:postId Route should make sure you are authenthicated.
postRouter.get("/:postId", getPost);

export default postRouter;