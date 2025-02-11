import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
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
	return (
		<>
			<div className="flex gap-3">
				<Button>Sign in</Button>
				<Link to={localStorage.getItem("jwt") ? "/" : "/log-in"}>
					<Button outlined>
						Log in
					</Button>
				</Link>

			</div>
		</>
	);
}
