import { browser } from '$app/environment';

import { writable } from 'svelte/store';
import { generateKey } from '../generateKey';
import { gun } from '../gun';
import { generateRandomColor } from '../util/generateRandomColor';
import { generateRandomName } from '../util/generateRandomName';

const LS_USER_KEY = 'user';

export class User {
	private key: string | null = null;
	color: string | null = null;
	name: string | null = null;

	constructor() {}

	public async init() {
		if (!browser) return;

		const userKey = localStorage.getItem(LS_USER_KEY);
		if (!userKey) {
			await this.create();
		} else {
			this.key = userKey;
			await this.load();
		}
	}

	private async load() {
		const key = this.key;
		if (!key) return;
		return new Promise<void>((resolve) => {
			gun
				.get('users')
				.get(key)
				.once((data) => {
					if (typeof data !== 'object') return;

					this.color = data.color;
					this.name = data.name;
					resolve();
				});
		});
	}

	private async create() {
		return new Promise<void>((resolve) => {
			const key = generateKey();
			const name = generateRandomName();
			const color = generateRandomColor();

			gun
				.get('users')
				.get(key)
				.put({ key, name, color })
				.then()
				.then(() => {
					localStorage.setItem(LS_USER_KEY, key);
					this.key = key;
					this.name = name;
					this.color = color;
					resolve();
				});
		});
	}

	public setCurrentPage(page: string | null) {
		if (!this.key) return this;
		gun.get('users').get(this.key).put({ currentPage: page });

		return this;
	}

	public setCurrentNode(nodeKey: string | null) {
		if (!this.key) return this;
		gun.get('users').get(this.key).put({ currentElement: nodeKey });

		return this;
	}
}

const userStore = writable<User>(new User());

async function initUserStore() {
	const user = new User();
	await user.init();
	userStore.set(user);
}
if (browser) initUserStore();

export { userStore };
