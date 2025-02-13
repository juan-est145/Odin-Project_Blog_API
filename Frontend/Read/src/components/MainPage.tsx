import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import { Toolbar } from "primereact/toolbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo42 from "#assets/42Logo.jpg";
import axios, { AxiosResponse } from "axios";

export default function MainPage() {
	const [posts, setPosts] = useState<Array>([]);

	useEffect(() => {
		const promise: Promise<AxiosResponse<any, any>> = axios.get("http://localhost:3000/posts");
		promise.then((value) => setPosts([value]));
	}, []);
	return (
		<>
			<Toolbar start={TBStart} end={TBEnd} />
			<Divider />
			<ImageCard />
		</>
	);
}

function TBStart() {
	return (
		<h1 className="m-0">Odin Blog</h1>
	);
}

function TBEnd() {
	const [loggedIn, setLogIn] = useState<boolean>(false);

	useEffect(() => {
		const jwt: string | null = localStorage.getItem("jwt");
		if (jwt)
			setLogIn(true);
		else
			setLogIn(false);
	}, []);

	return (
		<>
			<div className="flex gap-3">
				{loggedIn ? (
					<Button outlined onClick={() => {
						localStorage.removeItem("jwt");
						setLogIn(false);
					}}>Log out</Button>
				) : (
					<>
						<Button>Sign in</Button>
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
