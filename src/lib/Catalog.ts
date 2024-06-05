// catalogStore.ts
import { writable } from 'svelte/store';
import { CATALOG_PREFIX } from './constant';
import { gun } from './gun';

type Path = string;

class Catalog {
	public getPages(): Promise<Path[]> {
		return new Promise((resolve) => {
			gun.get(CATALOG_PREFIX).once((data) => {
				if (data && typeof data === 'object' && !Array.isArray(data)) {
					resolve(Object.keys(data).filter((x) => x !== '_'));
				}
			});
		});
	}

	public createPage(path: Path): Promise<void> {
		return new Promise((resolve) => {
			gun
				.get(CATALOG_PREFIX)
				.get(path)
				.put({})
				.once(() => {
					resolve();
				});
		});
	}

	public subscribe(callback: (pages: Path[]) => void) {
		const pages: Path[] = [];

		gun
			.get(CATALOG_PREFIX)
			.map()
			.on((node, key) => {
				if (node === null || pages.includes(key)) {
					return;
				}

				pages.push(key);

				callback(pages.filter((x) => x !== '_'));
			});
	}

	public async deletePage(path: Path): Promise<void> {
		await gun.get(CATALOG_PREFIX).get(path).put(null).then();
	}
}

const catalog = new Catalog();

function createCatalogStore() {
	const { subscribe, set } = writable<Path[]>([]);

	catalog.getPages().then((pages) => {
		set(pages);
	});

	catalog.subscribe((pages) => {
		set(pages);
	});

	return {
		subscribe,
		refresh: async () => {
			const pages = await catalog.getPages();
			set(pages);
		},
		createPage: async (path: Path) => {
			await catalog.createPage(path);
			const pages = await catalog.getPages();
			set(pages);
		},
		deletePage: async (path: Path) => {
			await catalog.deletePage(path);
			const pages = await catalog.getPages();
			set(pages);
		}
	};
}

export const catalogStore = createCatalogStore();
