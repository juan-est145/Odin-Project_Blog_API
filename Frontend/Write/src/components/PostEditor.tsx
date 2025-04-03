import { Posts } from "../types/types";
import apiClient from "../APiClient";
import { useEffect, useState } from "react";
import { Fieldset } from "primereact/fieldset";
import { Divider } from "primereact/divider";
import { SplitButton } from "primereact/splitbutton";
import { MenuItem } from "primereact/menuitem";
import { Editor } from "primereact/editor";
import { InputField } from "./PostCreator";
import { dateFormater } from "../auxFunc";

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
	const [editorActive, setEditor] = useState<boolean>(false);

	const items: MenuItem[] = [
		{ label: "Delete comment", icon: "pi pi-trash", command: () => alert("This is here for now") },
	];

	return (
		<>
			{
				editorActive ? <PostQuillEditor data={data}></PostQuillEditor>
					:
					<>
						<Fieldset legend={data.title} toggleable>
							{data.subtitle ? <h3>{data.subtitle}</h3> : null}
							<p>{data.text}</p>
							<p><b className="underline">Created at:</b> {dateFormater(data.createdAt)}</p>
							<p><b className="underline">Updated at:</b> {dateFormater(data.updatedAt)}</p>
							<p><b className="underline">Status:</b> {data.published ? "Published" : "Not published"}</p>
							<SplitButton label="Edit" icon="pi pi-file-edit" model={items} onClick={() => setEditor(true)}></SplitButton>
						</Fieldset>
						<Divider />
					</>
			}
		</>
	);
}

function PostQuillEditor({ data }: { data: Posts }) {
	const [title, setTitle] = useState<string>(data.title);
	const [subtitle, setSubtitle] = useState<string | null>(data.subtitle);
	const [text, setText] = useState<string>(data.text);

	const items: MenuItem[] = [
		{ label: "Publish", icon: "pi pi-check", command: () => alert("This is here for now") }
	];

	return (
		<>
			<InputField
				id="title"
				value={title}
				onChange={setTitle}
				labelText="Title (required)"
			></InputField>
			<Divider />
			<InputField
				id="subtitle"
				value={subtitle ? subtitle : undefined}
				onChange={setSubtitle}
				labelText="Subtitle (optional)"
			></InputField>
			<Divider />
			<Editor
				value={text}
				onTextChange={(e) => setText(e.textValue)}
				style={{ minHeight: "300px" }}
			></Editor>
			<Divider/>
			<SplitButton
			icon={"pi pi-save"}
			label={"Unpublish"} 
			model={items}></SplitButton>
			<Divider/>
		</>
	);
}