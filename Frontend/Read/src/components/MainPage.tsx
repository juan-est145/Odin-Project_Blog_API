import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { NavigateFunction, useNavigate } from "react-router-dom";


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
	const navigate: NavigateFunction = useNavigate();
	return (
		<>
			<div className="flex gap-3">
				<Button>Sign in</Button>
				<Button outlined onClick={() => navigate("/log-in")}>Log in</Button>
			</div>
		</>
	);
}
