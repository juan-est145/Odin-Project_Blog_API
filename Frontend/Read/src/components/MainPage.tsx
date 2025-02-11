import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function MainPage() {
	return (
		<>
			<Toolbar start={TBStart} end={TBEnd} />
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
