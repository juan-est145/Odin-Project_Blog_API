import { useParams } from "react-router-dom";
import { Header } from "./MainPage";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PostPage() {
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const { postId } = useParams<string>();

	useEffect(() => {
		const jwt: string | null = localStorage.getItem("jwt");
		if (!jwt)
			return;
		const promise = axios.get(`http://localhost:3000/posts/${postId}?nmbOfCmments=15`);
		promise.then((value) => console.log(value));
	}, [postId]);
	
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