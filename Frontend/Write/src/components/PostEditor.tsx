import { Posts } from "../types/types";

export function PostEditor() {
	return (
		<>
			<Post></Post>
		</>
	);
}

function Post({ data }: { data: Posts }) {
	return (
		<>
			<h3>{data.title}</h3>
			{data.subtitle ? <h2>{data.subtitle}</h2> : null}
			<p>{data.text}</p>
			<p>Created at: {data.createdAt}</p>
			<p>Updated at: {data.updatedAt}</p>
			<p>Status: {data.published ? "Published" : "Not published"}</p>
		</>
	);
}