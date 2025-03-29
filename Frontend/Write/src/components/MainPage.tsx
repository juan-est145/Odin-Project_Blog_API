import { useAuth } from "#project/src/Context";
import { Divider } from "primereact/divider";
import { Fieldset } from "primereact/fieldset";
import { MenuItem } from "primereact/menuitem";
import { SplitButton } from "primereact/splitbutton";
import { TabMenu } from "primereact/tabmenu";
import { useState } from "react";

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
	return (
		<>
			<div className="flex min-w-full flex-column justify-content-center gap-1">
				<CommentCard></CommentCard>
				<CommentCard></CommentCard>
				<CommentCard></CommentCard>
				<CommentCard></CommentCard>
				<CommentCard></CommentCard>
				<CommentCard></CommentCard>
				<CommentCard></CommentCard>
				<CommentCard></CommentCard>
				<CommentCard></CommentCard>
			</div>
		</>
	);
}

function CommentCard() {
	const items: MenuItem[] = [
		{ label: "Delete comment", icon: "pi pi-trash" },
	];
	return (
		<>
			<Fieldset legend={"Post title"} toggleable>
				<p>Text</p>
				<p>Created at</p>
				<p>Edited at</p>
				<SplitButton label="Edit" icon="pi pi-file-edit" model={items}/>
			</Fieldset>
		</>
	);
}

