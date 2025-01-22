import { Router } from "express";
import {
	getPostsCollection,
	getPost,
	postPost,
	postComment,
	getPostVal,
	postPostVal,
	postCommentVal,
	deletePostVal,
	deletePost,
} from "#controllers/postsControllers.js";
import passport from "passport";

const postRouter: Router = Router();

postRouter.get("/", getPostsCollection);

// The routes below must be all protected
postRouter.use("/", passport.authenticate("jwt", { session: false }));

postRouter.post("/", postPostVal, postPost);
postRouter.get("/:postId", getPostVal, getPost);
postRouter.delete("/:postId", deletePostVal, deletePost);
postRouter.post("/:postId/comment", postCommentVal, postComment);

// TO DO (optional). Allow editing for posts and comments. Use jwt.verify to make sure is the author doing so
// TO DO. Allow delete for posts and comments

export default postRouter;