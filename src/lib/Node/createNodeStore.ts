import { writable, type Writable } from 'svelte/store';
import { Page } from '../Page';
import type { Node } from './node';
import { debounce } from '../debounce';

export function createTrackNodeStore(path: string, key: string) {
	const page = new Page(path);
	const self: Writable<Node | null> = writable(null);

	if (key) {
		page.trackNode(key, (node) => {
			self.set(node);
		});
	}

	const setContent = (value: string) => {
		self.update((currentSelf) => {
			if (currentSelf) {
				page.updateNode(currentSelf.key, { value });
			}
			return currentSelf;
		});
	};

	const debouncedSetContent = debounce(setContent, 600);

	return {
		self,
		setContent,
		debouncedSetContent
	};
}
