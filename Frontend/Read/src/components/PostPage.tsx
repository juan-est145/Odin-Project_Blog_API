import { useParams } from "react-router-dom";
import { Header } from "./MainPage";

export default function PostPage() {
	const { postId } = useParams();
	return (
		<>
			<Header></Header>
			<h1>Esto ha tirado, estamos en {postId}</h1>
		</>
	);
}