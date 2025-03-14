import { useParams } from "react-router-dom";
import { Header } from "./MainPage";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "#project/src/Context";

export default function PostPage() {
	const { loggedIn } = useAuth();
	const { postId } = useParams<string>();

	useEffect(() => {
		if (!loggedIn)
			return;
		const promise = axios.get(`http://localhost:3000/posts/${postId}?nmbOfCmments=15`);
		promise.then((value) => console.log(value));
	}, [postId, loggedIn]);
	
	return (
		<>
			<Header></Header>
			<Divider/>
			<Card>
				<h1>Esto ha tirado, estamos en {postId}</h1>
			</Card>

		</>
	);
}