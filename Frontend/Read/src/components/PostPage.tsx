import { useParams, Link } from "react-router-dom";
import { Header } from "./MainPage";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { useEffect, useState } from "react";
import { useAuth } from "#project/src/Context";
import apiClient from "../ApiClient";
import { Comments, Posts } from "../types/types";
import { ProgressSpinner } from "primereact/progressspinner";

export default function PostPage() {
	const { loggedIn } = useAuth();
	const { postId } = useParams<string>();
	const [post, setPosts] = useState<Posts>();

	useEffect(() => {
		const promise = apiClient.GET("/v1/posts/{id}", { params: { path: { id: postId as string } } })
		promise.then((value) => setPosts(value.data))
			.catch(() => alert("Something went wrong"));
	}, [postId, loggedIn]);

	return (
		<>
			<Header></Header>
			<Divider />
			<ContentArea post={post}></ContentArea>
			<CommentSection id={postId as string} loggedIn={loggedIn}></CommentSection>
			<Divider />
		</>
	);
}

function ContentArea({ post }: { post: Posts | undefined }) {
	return (
		<>
			{post ? <Post post={post} /> : <Spinner />}
		</>
	);
}

function Post({ post }: { post: Posts }) {
	return (
		<>
			<Card className="px-8">
				<main className="flex flex-column">
					<h1 className="text-primary underline text-5xl m-0">{post?.title}</h1>
					<h3 className="text-3xl">{post?.subtitle}</h3>
					<p className="align-self-center text-lg" style={{ width: "100ch", textAlign: "justify", textJustify: "inter-word" }}>{post?.text}</p>
				</main>
			</Card>
		</>
	);

}

function Spinner() {
	return (
		<>
			<div className="flex flex-column align-items-center">
				<h1 className="text-6xl">Loading</h1>
				<ProgressSpinner strokeWidth="5"></ProgressSpinner>
			</div>
		</>
	);
}

function CommentSection({ id, loggedIn }: { id: string, loggedIn: boolean }) {
	const [comments, setComments] = useState<Comments[]>();
	const [nmbOfCmnts, setNmbOfCmnts] = useState<number>(10);

	useEffect(() => {
		if (!loggedIn)
			return;
		const promise = apiClient.GET("/v1/posts/{id}/comments", { params: { path: { id }, query: { nmbOfCmnts: nmbOfCmnts } } });
		promise.then((value) => setComments(value.data))
			.catch(() => alert("Error fetching comments"));
	}, [id, loggedIn, nmbOfCmnts]);

	return (
		<>
			<Divider />
			<Card>
				{
					loggedIn ?
						comments?.map((element) => (
							<Comment key={element.id} data={element} />
						))
						:
						<h1 className="text-center">
							<Link to={"/sign-in"} className="text-primary">Sign in </Link>
							or
							<Link to={"/log-in"} className="text-primary"> log in </Link> in order to see and post comments
						</h1>
				}
			</Card>
		</>
	);
}

function Comment({ data }: { data: Comments }) {
	return (
		<>
			<h3>{data.username}</h3>
			<span>{data.updatedAt}</span>
			<p style={{ width: "100ch", textAlign: "justify", textJustify: "inter-word" }}>{data.text}</p>
			<Divider />
		</>
	);
}