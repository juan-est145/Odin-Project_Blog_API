import { Posts } from "../types/types";
import apiClient from "../APiClient";
import { useEffect, useState } from "react";

export function PostEditor() {
	const [posts, setPosts] = useState<Posts[]>([]);
	useEffect(() => {
		const promise = apiClient.GET("/v1/accnt/posts");
		promise.then((element) => setPosts(element.data ? element.data : []))
			.catch(() => alert("Something went wrong, please try again at a later time"));
	}, []);
	return (
		<>
			{ posts.map((element) => {
				return <Post data={element} key={element.id}></Post>
			})}
		</>
	);
}

function Post({ data }: { data: Posts }) {
	return (
		<>
			<h2>{data.title}</h2>
			{data.subtitle ? <h3>{data.subtitle}</h3> : null}
			<p>{data.text}</p>
			<p>Created at: {data.createdAt}</p>
			<p>Updated at: {data.updatedAt}</p>
			<p>Status: {data.published ? "Published" : "Not published"}</p>
		</>
	);
}