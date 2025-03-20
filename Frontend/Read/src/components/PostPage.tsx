import { useParams } from "react-router-dom";
import { Header } from "./MainPage";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { useEffect } from "react";
import { useAuth } from "#project/src/Context";
import apiClient from "../ApiClient";

export default function PostPage() {
	const { loggedIn } = useAuth();
	const { postId } = useParams<string>();

	useEffect(() => {
		const promise = apiClient.GET("/v1/posts/{id}", { params: { path: { id: postId as string } } })
		promise.then((value) => console.log(value))
			.catch(() => alert("Something went wrong"));
	}, [postId, loggedIn]);

	return (
		<>
			<Header></Header>
			<Divider />
			<Card>
				<h1>Esto ha tirado, estamos en {postId}</h1>
			</Card>

		</>
	);
}