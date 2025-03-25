import { Link } from "react-router-dom";
import type { Comments } from "../types/types";
import { useState, useEffect } from "react";
import apiClient from "../ApiClient";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { MenuItem } from "primereact/menuitem";
import { TabMenu } from "primereact/tabmenu";
import { Editor } from "primereact/editor";
import "#project/src/assets/custom-quill.css";

export default function CommentSection({ id, loggedIn }: { id: string, loggedIn: boolean }) {
	return (
		<>
			<Divider />
			<Card>
				{
					loggedIn ?
						<>
							<CommentTabMenu id={id} />
						</>
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

function CommentTabMenu({ id }: { id: string }) {
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const items: MenuItem[] = [
		{ label: "Comment editor", icon: "pi pi-pencil" },
		{ label: "Comments", icon: "pi pi-comments" },
	];
	const components: JSX.Element[] = [
		<CommentEditor />,
		<CommentList id={id} />,
	];

	return (
		<>
			<TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
			{components[activeIndex]}
		</>
	);
}

function CommentList({ id }: { id: string }) {
	const [comments, setComments] = useState<Comments[] | []>();
	const [nmbOfCmnts, setNmbOfCmnts] = useState<number>(10);
	const [buttonLoad, setBtnLoad] = useState<boolean>(true);

	useEffect(() => {
		const promise = apiClient.GET("/v1/posts/{id}/comments", { params: { path: { id }, query: { nmbOfCmnts: nmbOfCmnts } } });
		promise.then((value) => {
			setComments(value.data)
			setBtnLoad(false);
		})
			.catch(() => alert("Error fetching comments"));
	}, [id, nmbOfCmnts]);
	return (
		<>
			{
				comments?.map((element) => (
					<Comment key={element.id} data={element} />
				))
			}
			{
				comments && comments.length > 0 ?
					<Button
						loading={buttonLoad}
						onClick={() => {
							setBtnLoad(true)
							setNmbOfCmnts(nmbOfCmnts + 5);
						}}>Load more comments</Button>
					:
					null
			}
		</>
	);
}

function Comment({ data }: { data: Comments }) {
	const formattedDate = new Intl.DateTimeFormat(navigator.language, {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	}).format(new Date(data.updatedAt));

	return (
		<>
			<h3>{data.username}</h3>
			<span>{formattedDate}</span>
			<p style={{ width: "100ch", textAlign: "justify", textJustify: "inter-word" }}>{data.text}</p>
			<Divider />
		</>
	);
}

function CommentEditor() {
	const [text, setText] = useState<string>("");
	return (
		<>
			<section className="flex flex-column gap-2">
				<Editor
				value={text}
				onTextChange={(e) => setText(e.htmlValue as string)}
				style={{ minHeight: "300px" }}
				></Editor>
				<Button className="align-self-center">Sumbit</Button>
			</section>
		</>
	);
}