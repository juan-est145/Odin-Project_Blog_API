import createClient, { Middleware } from "openapi-fetch";
import type { paths } from "./types/API";

const authMiddleWare: Middleware = {
	onRequest({ request }) {
		const token = localStorage.getItem("jwt");
		if (!token)
			return (request);
		request.headers.set("Authorization", `Bearer ${token}`);
		return (request);
	}
}

const apiClient = createClient<paths>({ baseUrl: "http://localhost:3000" });
apiClient.use(authMiddleWare);

export default apiClient;