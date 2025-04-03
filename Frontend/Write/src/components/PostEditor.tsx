import { BoolString, Posts } from "../types/types";
import apiClient from "../APiClient";
import { useEffect, useState, Dispatch, SetStateAction, useRef } from "react";
import { Fieldset } from "primereact/fieldset";
import { Divider } from "primereact/divider";
import { SplitButton } from "primereact/splitbutton";
import { MenuItem } from "primereact/menuitem";
import { Editor } from "primereact/editor";
import { InputField } from "./PostCreator";
import { dateFormater } from "../auxFunc";
import { Toast, ToastMessage } from "primereact/toast";

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
				return <PostCard data={element} posts={posts} setPosts={setPosts} key={element.id}></PostCard>
			})}
		</>
	);
}

function PostCard({ data, posts, setPosts }: { data: Posts, posts: Posts[], setPosts: Dispatch<SetStateAction<Posts[]>> }) {
	const [editorActive, setEditor] = useState<boolean>(false);

	const items: MenuItem[] = [
		{ label: "Delete comment", icon: "pi pi-trash", command: () => alert("This is here for now") },
	];

	return (
		<>
			{
				editorActive ?
					<PostQuillEditor
						postData={data}
						posts={posts}
						setPosts={setPosts}
						setEditor={setEditor}>
					</PostQuillEditor>
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

function PostQuillEditor({ postData, posts, setPosts, setEditor }
	: {
		postData: Posts,
		posts: Posts[],
		setPosts: Dispatch<SetStateAction<Posts[]>>,
		setEditor: Dispatch<SetStateAction<boolean>>,
	}) {
	const [title, setTitle] = useState<string>(postData.title);
	const [subtitle, setSubtitle] = useState<string | null>(postData.subtitle);
	const [text, setText] = useState<string>(postData.text);
	const toast = useRef<Toast>(null);

	async function updatePost(publish: BoolString) {
		const { data, error } = await apiClient.PUT("/v1/accnt/posts/{postId}", {
			body: {
				text: text.substring(0, text.length - 1),
				title: title,
				subtitle: subtitle ? subtitle : undefined,
				publish,
			},
			params: { path: { postId: postData.id } }
		});
		if (data) {
			const updatedPosts = posts.map((element) => {
				if (element.id !== data.id)
					return (element);
				return ({
					...data,
					updatedAt: dateFormater(data.updatedAt),
					createdAt: dateFormater(data.createdAt),
				});
			});
			setPosts(updatedPosts);
			setEditor(false);
		}
		else {
			const toastOpts: ToastMessage[] = error.message instanceof Array ?
				error.message.map((element) => Object.assign<object, ToastMessage>({}, { severity: "error", summary: element })) :
				[{ severity: "error", summary: error.message }];
			return (toast.current?.show(toastOpts));
		}
	}

	const items: MenuItem[] = [
		{ label: "Publish", icon: "pi pi-check", command: async () => await updatePost("true") }
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
			<Divider />
			<SplitButton
				icon={"pi pi-save"}
				label={"Unpublish"}
				model={items}
				onClick={async () => await updatePost("false")}></SplitButton>
			<Divider />
			<Toast ref={toast} position={"bottom-right"}></Toast>
		</>
	);
}