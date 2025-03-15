import { Posts } from "@prisma/client";

export interface IPosts extends Posts {

};

export interface IGetPostReqParams {
	postId: string,
}

export interface IGetPostReqQuery {
	nmbOfCmments?: string,
}

export interface IPostPostReqBody {
	title: string,
	subtitle?: string,
	text: string,
	published?: "true" | "false",
}

export interface IPostCommentReqBody {
	text: string
}

export interface IPostCommentReqParams {
	postId: string,
}

export interface IDeletePostReqParams {
	postId: string,
}

export interface IDeleteCommentReqParams {
	postId: string,
	commentId: string,
}