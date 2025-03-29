import { useAuth } from "#project/src/Context";
import { Divider } from "primereact/divider";
import { Fieldset } from "primereact/fieldset";
import { MenuItem } from "primereact/menuitem";
import { SplitButton } from "primereact/splitbutton";
import { TabMenu } from "primereact/tabmenu";
import { useEffect, useState } from "react";
import { Comments } from "../types/types";
import apiClient from "../APiClient";

export default function MainPage() {
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const items: MenuItem[] = [
		{ label: "Your comments", icon: "pi pi-comments" },
		{ label: "Your posts", icon: "pi pi-file" },
		{ label: "Create a new post", icon: "pi pi-file-edit" },
	];
	const components: JSX.Element[] = [
		<CommentsSection />
	];

	const { loggedIn } = useAuth();
	return (
		<>
			{loggedIn ? <h1>You are logged in</h1> : <h1>You are not logged in</h1>}
			<TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}></TabMenu>
			<Divider/>
			{components[activeIndex]}
		</>
	);
}

function CommentsSection() {
	const [comments, setComments] = useState<Comments[]>([]);
	useEffect(() => {
		const promise = apiClient.GET("/v1/accnt/comments");
		promise.then((value) => {
			if (value.data)
				setComments(value.data);
			else
				console.error("No data");
		});
		// TO DO: Make this more graceful 
		promise.catch(() => alert("Something went wrong, please try again at a later time"));
	}, []);
	return (
		<>
			<div className="flex min-w-full flex-column justify-content-center gap-1">
				{comments.map((element) => {
					return <CommentCard key={element.id} comment={element}></CommentCard>
				})}
			</div>
		</>
	);
}

function CommentCard({ comment }: { comment: Comments }) {
	const items: MenuItem[] = [
		{ label: "Delete comment", icon: "pi pi-trash" },
	];
	return (
		<>
			<Fieldset legend={comment.postTitle} toggleable>
				<p>{comment.text}</p>
				<p>Created at: {comment.createdAt}</p>
				<p>Updated at: {comment.updatedAt}</p>
				<SplitButton label="Edit" icon="pi pi-file-edit" model={items}/>
			</Fieldset>
		</>
	);
}

