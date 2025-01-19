import { Router } from "express";
import { getPostsCollection, getPost, postPost, postComment, getPostVal } from "#controllers/postControllers";

const postRouter: Router = Router();

postRouter.get("/", getPostsCollection);

// TO DO: This routes should be protected.
postRouter.post("/", postPost);
postRouter.get("/:postId", getPostVal, getPost);
postRouter.post("/:postId/comment", postComment);

//TO DO (optional). Allow editing for posts and comments. Use jwt.verify to make sure is the author doing so
// TO DO. Allow delete for posts and comments

export default postRouter;