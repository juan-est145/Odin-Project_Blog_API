import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Toast, ToastMessage } from "primereact/toast";
import { Password } from "primereact/password";
import { useEffect, useRef, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { useAuth } from "#project/src/Context";
import apiClient from "../ApiClient";

export function LogIn() {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const redirect: NavigateFunction = useNavigate();
	const toast = useRef<Toast>(null);
	const { loggedIn, setLoggedIn } = useAuth();

	async function postLogin() {
		const { data, error } = await apiClient.POST("/v1/auth/log-in", { body: { username, password } });
		if (data) {
			localStorage.setItem("jwt", data.token);
			setLoggedIn(true);
			redirect("/");
			return;
		}
		function setErrors(elements: string): ToastMessage {
			return { severity: "error", summary: elements };
		}
		const toastOpts: ToastMessage[] = error.statusCode <= 500 ?
			[...error.message.map(setErrors)] : [{ severity: "error", summary: "Something went wrong. Please, try at a later time" }];
		return toast.current?.show(toastOpts);
	}

	useEffect(() => {
		if (loggedIn)
			redirect("/");
	}, [redirect, loggedIn]);

	return (
		<>
			<main className="flex min-h-screen flex-column justify-content-center align-items-center bg-gray-700">
				<Card title={<h3 style={{ margin: 0, textAlign: "center" }}>Log in</h3>}>
					<div className="flex flex-column gap-4">
						<Toast ref={toast} />
						<FloatLabel>
							<InputText
								name={"username"}
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="min-w-full"
								id={"username"}
								required />
							<label htmlFor="username">Username</label>
						</FloatLabel>
						<FloatLabel>
							<Password
								value={password}
								name={"password"}
								onChange={(e) => setPassword(e.target.value)}
								className="min-w-full" inputId="password"
								toggleMask
								feedback={false}
								required />
							<label htmlFor="password">Password</label>
						</FloatLabel>
						<span className="align-self-center">
							Don't have an account? <Link to={"/sign-in"} style={{ color: "var(--primary-color)" }}>Sign in</Link>
						</span>
						<Button className="align-self-center" onClick={async () => await postLogin()}>Log in</Button>
					</div>
				</Card>
			</main>
		</>
	);
}

export function SignIn() {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confPass, setConfPass] = useState<string>("");
	const redirect = useNavigate();
	const toast = useRef<Toast>(null);

	async function postSignIn() {
		const { data, error } = await apiClient.POST("/v1/auth/sign-in", { body: { username, password, confPass } });
		if (data)
			return redirect("/");
		const clientErrors: ToastMessage[] = error.message instanceof Array? 
			[...error.message.map((element) => Object.assign({}, { severity: "error", summary: element } as ToastMessage))] : [ { severity: "error", summary: error.message } ]
		const toastOpts: ToastMessage[] = error.statusCode <= 500 ?
			clientErrors : [{ severity: "error", summary: "Something went wrong. Please, try at a later time" }];
		return toast.current?.show(toastOpts);
		// await axios.post(
		// 	"http://localhost:3000/account/sign-in",
		// 	{ username, password },
		// 	{ headers: { "Content-Type": "application/x-www-form-urlencoded" } });
		// redirect("/");
	}

	useEffect(() => {
		const token: string | null = localStorage.getItem("jwt");
		if (token)
			redirect("/");
	}, [redirect]);

	return (
		<>
			<main className="flex min-h-screen flex-column justify-content-center align-items-center bg-gray-700">
				<Card title={<h3 style={{ margin: 0, textAlign: "center" }}>Sign in</h3>}>
					<div className="flex flex-column gap-4">
						<Toast ref={toast} />
						<FloatLabel>
							<InputText
								name={"username"}
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="min-w-full"
								id={"username"}
								required />
							<label htmlFor="username">Username</label>
						</FloatLabel>
						<FloatLabel>
							<Password
								value={password}
								name={"password"}
								onChange={(e) => setPassword(e.target.value)}
								className="min-w-full" inputId="password"
								toggleMask
								feedback={false}
								required />
							<label htmlFor="password">Password</label>
						</FloatLabel>
						<FloatLabel>
							<Password
								value={confPass}
								name={"confPass"}
								onChange={(e) => setConfPass(e.target.value)}
								className="min-w-full" inputId="confPass"
								toggleMask
								feedback={false}
								required />
							<label htmlFor="confPass">Confirm password</label>
						</FloatLabel>
						<span className="align-self-center">
							Already have an account? <Link to={"/log-in"} style={{ color: "var(--primary-color)" }}>Log in</Link>
						</span>
						<Button className="align-self-center" onClick={async () => await postSignIn()}>Sign in</Button>
					</div>
				</Card>
			</main>
		</>
	);
}