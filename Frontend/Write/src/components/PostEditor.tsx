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
import { Button } from "primereact/button";

export function PostEditor() {
	const [posts, setPosts] = useState<Posts[]>([]);
	const [nmbOfPosts, setNmbOfPosts] = useState<number>(10);
	useEffect(() => {
		const promise = apiClient.GET("/v1/accnt/posts", { params: { query: { nmbOfPosts } } });
		promise.then((element) => setPosts(element.data ? element.data : []))
			.catch(() => alert("Something went wrong, please try again at a later time"));
	}, [nmbOfPosts]);

	return (
		<>
			{posts.map((element) => {
				return <PostCard postData={element} posts={posts} setPosts={setPosts} key={element.id}></PostCard>
			})}
			<Button onClick={() => setNmbOfPosts(nmbOfPosts + 5)}>Load more posts</Button>
		</>
	);
}

function PostCard({ postData, posts, setPosts }: { postData: Posts, posts: Posts[], setPosts: Dispatch<SetStateAction<Posts[]>> }) {
	const [editorActive, setEditor] = useState<boolean>(false);

	async function deletePost() {
		const { data, error } = await apiClient.DELETE("/v1/accnt/posts/{postId}", {
			params: { path: { postId: postData.id } }
		});
		if (data) {
			const updatedPosts = posts.filter((element) => element.id !== data.id);
			setPosts(updatedPosts);
		}
		else if (error.statusCode < 500)
			alert("That operation is not allowed");
		else
			alert("Something went wrong, please try again at a later time");
	}

	const items: MenuItem[] = [
		{ label: "Delete comment", icon: "pi pi-trash", command: async () => await deletePost() },
	];

	return (
		<>
			{
				editorActive ?
					<PostQuillEditor
						postData={postData}
						posts={posts}
						setPosts={setPosts}
						setEditor={setEditor}>
					</PostQuillEditor>
					:
					<>
						<Fieldset legend={postData.title} toggleable>
							{postData.subtitle ? <h3>{postData.subtitle}</h3> : null}
							<p>{postData.text}</p>
							<p><b className="underline">Created at:</b> {dateFormater(postData.createdAt)}</p>
							<p><b className="underline">Updated at:</b> {dateFormater(postData.updatedAt)}</p>
							<p><b className="underline">Status:</b> {postData.published ? "Published" : "Not published"}</p>
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