import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import { Toolbar } from "primereact/toolbar";
import { HtmlHTMLAttributes, useEffect, useState, Dispatch, SetStateAction } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo42 from "#project/src/assets/42Logo.jpg"
import postImage from "#project/src/assets/pexels-pixabay-261763.jpg";
import { useAuth } from "#project/src/Context";
import { Skeleton } from "primereact/skeleton";
import { Posts } from "../types/types";
import apiClient from "../ApiClient";


export default function MainPage() {
	const [posts, setPosts] = useState<Posts[] | null>([]);
	const [nmbOfPosts, setNmbOfPosts] = useState<number>(10);

	useEffect(() => {
		const promise = apiClient.GET("/v1/posts", { params: { query: { published: true, nmbOfPosts } } });
		promise.then((value) => setPosts(value.data ? value.data : []))
			.catch(() => setPosts(null));
	}, [nmbOfPosts]);

	function SkelLoad() {
		const props: HtmlHTMLAttributes<HTMLDivElement> = {
			className: "flex-1",
			style: { width: "10rem", height: "20rem" },
		};
		return (
			<>
				<Skeleton {...props}></Skeleton>
				<Skeleton {...props}></Skeleton>
				<Skeleton {...props}></Skeleton>
			</>
		);
	}
	return (
		<>
			<Header />
			<Divider />
			<ImageCard />
			<Divider />
			{posts && posts.length > 0 ?
				<PostsCollection
					posts={posts}
					nmbOfPosts={nmbOfPosts}
					setNmbOfPosts={setNmbOfPosts}>
				</PostsCollection> : posts && <SkelLoad></SkelLoad>}
			{!posts && <h1>Oops, something went wrong. Try at another time</h1>}
		</>
	);
}

function PostsCollection({ posts, nmbOfPosts, setNmbOfPosts }: { posts: Posts[], nmbOfPosts: number, setNmbOfPosts: Dispatch<SetStateAction<number>> }) {
	return (
		<>
			<div className="flex flex-wrap gap-1">
				{posts.map((element) => {
					return (
						<PostsCard key={element.id} postInfo={element}></PostsCard>
					);
				})}
			</div>
			<div className="flex justify-content-center align-items-center">
				<Button onClick={() => setNmbOfPosts(nmbOfPosts + 5)} size="large">Refresh</Button>
			</div>
		</>

	);
}

export function Header() {
	return (
		<Toolbar start={TBStart} end={TBEnd} />
	);
}


function TBStart() {
	return (
		<>
			<h1 className="m-0">
				<Link to={"/"} className="no-underline text-white">Odin Blog</Link>
			</h1>
		</>
	);
}

function TBEnd() {
	const { loggedIn, setLoggedIn } = useAuth();
	const redirect = useNavigate()

	return (
		<>
			<div className="flex gap-3">
				{loggedIn ? (
					<Button outlined onClick={() => {
						localStorage.removeItem("jwt");
						setLoggedIn(false);
						redirect("/");
					}}>Log out</Button>
				) : (
					<>
						<Link to={"/sign-in"}>
							<Button>
								Sign in
							</Button>
						</Link>
						<Link to={"/log-in"}>
							<Button outlined>
								Log in
							</Button>
						</Link>
					</>
				)}
			</div>
		</>
	);
}

function ImageCard() {
	return (
		<Card>
			<div className="flex justify-content-around p-2">
				<section>
					<h1 className="m-1 text-5xl">Welcome to the</h1>
					<h1 className="m-1 text-5xl" style={{ color: "var(--primary-color)" }}>Odin Blog</h1>
					<p className="text-xl" style={{ maxWidth: "40ch" }}>A blog created with a REST API on the backend and React on the front-end</p>
					<a href="https://github.com/juan-est145">
						<Button label="Github" icon="pi pi-github" />
					</a>
				</section>
				<img src={Logo42} style={{ minHeight: "50%", maxWidth: "35%" }}></img>
			</div>
		</Card>
	);
}

function PostsCard({ postInfo }: { postInfo: Posts }) {
	const text: string = postInfo.text.substring(0, 200)

	return (
		<Card className="flex-1 flex justify-content-center align-content-center w-2rem">
			<Link className="no-underline text-white" to={`/post/${postInfo.id}`}>
				<img src={postImage} alt="An image of text" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
				<div>
					<h1 className="text-base text-overflow-ellipsis overflow-hidden" style={{ maxWidth: "20ch" }}>{postInfo.title}</h1>
					<Divider />
					<h2 className="text-base text-overflow-ellipsis">{postInfo.subtitle ? postInfo.subtitle : null}</h2>
					<p className="text-overflow-ellipsis">{text}</p>
				</div>
			</Link>
		</Card>
	);
}
