import { ReactNode, useContext, useState, createContext, useEffect } from "react";

interface ILoggedContext {
	loggedIn: boolean,
	setLoggedIn: (loggedIn: boolean) => void;
};

const AuthContext = createContext<ILoggedContext | undefined>(undefined);

export function LoggedProvider({ children }: { children: ReactNode }) {
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	useEffect(() => {
		const jwt: string | null = localStorage.getItem("jwt");
		if (jwt)
			setLoggedIn(true);
		else
			setLoggedIn(false);
	}, []);

	return (
		<>
			<AuthContext.Provider value={{loggedIn, setLoggedIn,}}>
				{ children }
			</AuthContext.Provider>
		</>
	);
}

export function useAuth() {
	const context= useContext(AuthContext);
	if (context === undefined)
		throw new Error('useAuth must be used within an LoggedProvider');
	return (context);
}