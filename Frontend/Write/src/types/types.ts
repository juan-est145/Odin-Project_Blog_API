import { components } from "./API";

export type Comments = components["schemas"]["AccntCommentsDto"];
export type BoolString = components["schemas"]["CreatePostBodyDto"]["publish"];
export type Posts = components["schemas"]["PostDto"];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPostResponse(value: any): value is Posts {
	return (
		typeof value === "object" &&
		value !== null &&
		typeof value.id === "string" &&
		typeof value.userId === "number" &&
		typeof value.title === "string" &&
		(typeof value.subtitle === "string" || value.subtitle === null) &&
		typeof value.text === "string" &&
		typeof value.published === "boolean" &&
		typeof value.createdAt === "string" &&
		typeof value.updatedAt === "string"
	);
}