export function debounce<T extends (...args: never[]) => void>(
	fn: T,
	delay: number
): (...args: Parameters<T>) => void {
	let timeoutID: ReturnType<typeof setTimeout>;
	return function (...args: Parameters<T>) {
		clearTimeout(timeoutID);
		timeoutID = setTimeout(() => fn(...args), delay);
	};
}
