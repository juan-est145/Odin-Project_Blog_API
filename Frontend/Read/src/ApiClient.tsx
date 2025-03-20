import createClient from "openapi-fetch";
import type { paths } from "./types/API";

const apiClient = createClient<paths>({ baseUrl: "http://localhost:3000" });

export default apiClient;