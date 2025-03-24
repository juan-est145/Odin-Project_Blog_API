import { useParams } from "react-router-dom";
import { Header } from "./MainPage";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { useEffect, useState } from "react";
import { useAuth } from "#project/src/Context";
import apiClient from "../ApiClient";
import { Posts } from "../types/types";

export default function PostPage() {
	const { loggedIn } = useAuth();
	const { postId } = useParams<string>();
	const [post, setPosts] = useState<Posts | undefined>(undefined);

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
			<Divider />
		</>
	);
}

function ContentArea({ post }: { post: Posts | undefined }) {
	return (
		<>
			<Card className="p-4">
				<main className="flex flex-column">
					<h1 className="text-primary underline text-5xl m-0">{post?.title}</h1>
					<h3 className="text-3xl">{post?.subtitle}</h3>
					<p className="align-self-center text-center 70" style={{ width: "80ch" }}>{post?.text}</p>
				</main>
			</Card>
		</>
	);
}