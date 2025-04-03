import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Link } from "react-router";
import shrekGif from "#project/src/assets/shrek-reaction.gif"

export function ErrorPage() {
	return (
		<>
			<Card>
				<main className="flex justify-center align-items-center flex-column">
					<h1 className="text-6xl font-bold text-primary align-self-start m-0">Oops !!!</h1>
					<Divider/>
					<img src={shrekGif} alt="Shrek gif"/>
					<h3 className="text-3xl">It seems you got lost. You can go back to the main menu by clicking <Link className="text-primary" to={"/"}>here</Link></h3>
				</main>
			</Card>
		</>
	);
}