import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Toast, ToastMessage } from "primereact/toast";
import { Password } from "primereact/password";
import { useEffect, useRef, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { useAuth } from "../Context";
import apiClient from "../APiClient";

const error500Toast: ToastMessage = {
	severity: "error",
	summary: "Something went wrong. Please, try at a later time"
}

export function LogIn() {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const redirect: NavigateFunction = useNavigate();
	const toast = useRef<Toast>(null);
	const { loggedIn, setLoggedIn } = useAuth();

	async function postLogin() {
		try {
			const { data, error } = await apiClient.POST("/v1/auth/log-in", { body: { username, password } });
			if (data) {
				localStorage.setItem("jwt", data.token);
				setLoggedIn(true);
				redirect("/");
				return;
			}
			const toastOpts: ToastMessage[] = error.message instanceof Array ?
				error.message.map((element) => Object.assign<object, ToastMessage>({}, { severity: "error", summary: element }))
				:
				[{ severity: "error", summary: error.message }];
			return toast.current?.show(toastOpts);
		} catch {
			return toast.current?.show(error500Toast);
		}

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
						<Button className="align-self-center" onClick={async () => await postLogin()}>Log in</Button>
					</div>
				</Card>
			</main>
		</>
	);
}