export interface Posts  {
	id: string,
    title: string,
    subtitle: string | null,
    text: string,
    published: boolean,
    userId: number,
    createdAt: Date,
    updatedAt: Date,
}