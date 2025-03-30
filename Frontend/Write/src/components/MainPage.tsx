import { useAuth } from "#project/src/Context";
import { Divider } from "primereact/divider";
import { Fieldset } from "primereact/fieldset";
import { MenuItem } from "primereact/menuitem";
import { SplitButton } from "primereact/splitbutton";
import { TabMenu } from "primereact/tabmenu";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
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
			<Divider />
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
		promise.catch(() => alert("Something went wrong, please try again at a later time"));
	}, []);
	return (
		<>
			<div className="flex min-w-full flex-column justify-content-center gap-1">
				{comments.length > 0 ? comments.map((element) => {
					return <CommentCard
						key={element.id}
						comment={element}
						comments={comments}
						setComments={setComments}></CommentCard>
				}) : <h1>You have no comments yet</h1>}
			</div>
		</>
	);
}

function CommentCard({ comment, comments, setComments }
	: {
		comment: Comments,
		comments: Comments[],
		setComments: Dispatch<SetStateAction<Comments[]>>
	}) {
	async function deleteComment() {
		const { data, error } = await apiClient.DELETE("/v1/accnt/comments/{commentId}",
			{ params: { path: { commentId: comment.id } } });
		if (data?.code === 200)
			return setComments(comments.filter((element) => element.id !== comment.id));
		if (error?.statusCode === 400)
			alert("Invalid comment id");
	}

	const items: MenuItem[] = [
		{ label: "Delete comment", icon: "pi pi-trash", command: async () => await deleteComment() },
	];

	return (
		<>
			<Fieldset legend={comment.postTitle} toggleable>
				<p>{comment.text}</p>
				<p>Created at: {comment.createdAt}</p>
				<p>Updated at: {comment.updatedAt}</p>
				<SplitButton label="Edit" icon="pi pi-file-edit" model={items} />
			</Fieldset>
		</>
	);
}

