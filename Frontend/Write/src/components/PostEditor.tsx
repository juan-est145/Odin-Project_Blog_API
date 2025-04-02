import { Posts } from "../types/types";
import apiClient from "../APiClient";
import { useEffect, useState } from "react";
import { Fieldset } from "primereact/fieldset";
import { Divider } from "primereact/divider";

export function PostEditor() {
	const [posts, setPosts] = useState<Posts[]>([]);
	useEffect(() => {
		const promise = apiClient.GET("/v1/accnt/posts");
		promise.then((element) => setPosts(element.data ? element.data : []))
			.catch(() => alert("Something went wrong, please try again at a later time"));
	}, []);

	return (
		<>
			{posts.map((element) => {
				return <Post data={element} key={element.id}></Post>
			})}
		</>
	);
}

function Post({ data }: { data: Posts }) {
	return (
		<>
			<Fieldset legend={data.title} toggleable>
				{data.subtitle ? <h3>{data.subtitle}</h3> : null}
				<p>{data.text}</p>
				<p><b className="underline">Created at:</b> {data.createdAt}</p>
				<p><b className="underline">Updated at:</b> {data.updatedAt}</p>
				<p><b className="underline">Status:</b> {data.published ? "Published" : "Not published"}</p>
			</Fieldset>
			<Divider/>
		</>
	);
}