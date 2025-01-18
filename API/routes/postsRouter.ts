import { Router } from "express";
import { getPostsCollection, getPost, postPost, postComment } from "#controllers/postControllers";

const postRouter: Router = Router();

postRouter.get("/", getPostsCollection);

// TO DO: This routes should be protected.
postRouter.post("/", postPost);
postRouter.get("/:postId", getPost);
postRouter.post("/:postId/comment", postComment);

//TO DO (optional). Allow editing for posts and comments
// TO DO. Allow delete for posts and comments

export default postRouter;