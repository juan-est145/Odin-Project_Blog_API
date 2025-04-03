import { useEffect, useState, Dispatch, SetStateAction, useRef } from "react";
import { SplitButton } from "primereact/splitbutton";
import { Fieldset } from "primereact/fieldset";
import { Comments } from "../types/types";
import apiClient from "../APiClient";
import { Editor } from "primereact/editor";
import "#project/src/assets/custom-quill.css";
import { Button } from "primereact/button";
import { Toast, ToastMessage } from "primereact/toast";
import { MenuItem } from "primereact/menuitem";
import { Divider } from "primereact/divider";
import { dateFormater } from "../auxFunc";

export function CommentsSection() {
	const [comments, setComments] = useState<Comments[]>([]);
	const [nmbOfCmmnts, setNmbOfCmmnts] = useState<number>(10);
	useEffect(() => {
		const promise = apiClient.GET("/v1/accnt/comments", { params: { query: { nmbOfCmmnts } } });
		promise.then((value) => {
			if (value.data)
				setComments(value.data);
			else
				console.error("No data");
		});
		promise.catch(() => alert("Something went wrong, please try again at a later time"));
	}, [nmbOfCmmnts]);
	return (
		<>
			<div className="flex min-w-full flex-column justify-content-center gap-1">
				{comments.length > 0 ?
					<>
						{
							comments.map((element) => {
								return <CommentCard
									key={element.id}
									comment={element}
									comments={comments}
									setComments={setComments}></CommentCard>
							})
						}
						<Button
							onClick={() => setNmbOfCmmnts(nmbOfCmmnts + 5)}
							className="align-self-center"
						>Load more comments</Button>
					</>
					: <h1>You have no comments yet</h1>}
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
	const [editorActive, setEditor] = useState<boolean>(false);

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
				{
					editorActive ?
						<CommentEditor
							comment={comment}
							comments={comments}
							setComments={setComments}
							setEditor={setEditor}></CommentEditor>
						:
						<>
							<p>{comment.text}</p>
							<p>Created at: {dateFormater(comment.createdAt)}</p>
							<p>Updated at: {dateFormater(comment.updatedAt)}</p>
							<SplitButton
								label="Edit"
								icon="pi pi-file-edit"
								model={items}
								onClick={() => setEditor(true)} />
						</>
				}
			</Fieldset>
		</>
	);
}

function CommentEditor({ comment, comments, setComments, setEditor }
	: {
		comment: Comments,
		comments: Comments[],
		setComments: Dispatch<SetStateAction<Comments[]>>,
		setEditor: Dispatch<SetStateAction<boolean>>
	}) {
	const [text, setText] = useState<string>(comment.text);
	const toast = useRef<Toast>(null);

	async function updateComment() {
		const { data, error } = await apiClient.PUT("/v1/accnt/comments/{commentId}",
			{ body: { text: text.substring(0, text.length - 1) }, params: { path: { commentId: comment.id } } }
		);
		if (data) {
			const updatedComments = comments.map((element) => {
				if (element.id !== data.id)
					return (element);
				return ({
					...data,
					updatedAt: dateFormater(data.updatedAt),
					createdAt: dateFormater(data.createdAt),
				});
			});
			setComments(updatedComments);
			setEditor(false);
		}
		else {
			const toastOpts: ToastMessage[] = error.message instanceof Array ?
				error.message.map((element) => Object.assign({}, { severity: "error", summary: element } as ToastMessage)) :
				[{ severity: "error", summary: error.message }];

			return toast.current?.show(toastOpts);
		}
	}

	return (
		<>
			<Editor
				value={text}
				onTextChange={(e) => setText(e.textValue)}
				style={{ minHeight: "300px" }}></Editor>
			<Divider />
			<Button onClick={async () => await updateComment()}>Update comment</Button>
			<Toast ref={toast} position={"bottom-right"}></Toast>
		</>
	);
}

