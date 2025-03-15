import { Router } from "express";
import {
	getPostsCollection,
	getPostsCollVal,
	getPost,
	postPost,
	postComment,
	getPostVal,
	postPostVal,
	postCommentVal,
	deletePostVal,
	deletePost,
	deleteCommentVal,
	deleteComment,
} from "#controllers/postsControllers.js";
import passport from "passport";

const postRouter: Router = Router();

postRouter.get("/", getPostsCollVal, getPostsCollection);

// The routes below must be all protected
postRouter.use("/", passport.authenticate("jwt", { session: false }));

postRouter.post("/", postPostVal, postPost);
postRouter.get("/:postId", getPostVal, getPost);
postRouter.delete("/:postId", deletePostVal, deletePost);
postRouter.post("/:postId/comment", postCommentVal, postComment);
postRouter.delete("/:postId/comment/:commentId", deleteCommentVal, deleteComment);

// TO DO (optional). Allow editing for posts and comments. Use jwt.verify to make sure is the author doing so

export default postRouter;