export function dateFormater(date: string) {
	try {
		const dateFormmater = new Intl.DateTimeFormat(navigator.language, {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
		return dateFormmater.format(new Date(date));
	} catch {
		return (date);
	}
}