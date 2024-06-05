/**
 * TODO:
 * 1. Create pseudo-anonymous user on first visit, save to local storage
 * 2. Store user data in GUN
 * 3. Track page user is currently on
 * 4. Track element user is currently interacting with
 */

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
		if (typeof window === 'undefined') return;

		const userKey = localStorage.getItem(LS_USER_KEY);
		if (!userKey) {
			await this.create();
		} else {
			this.key = userKey;
			await this.load();
		}

		console.log('this', this);
	}

	private async load() {
		const key = this.key;
		if (!key) return;
		return new Promise<void>((resolve) => {
			gun
				.get('users')
				.get(key)
				.map()
				.once((data) => {
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
				.set({ key, name, color })
				.then()
				.then(() => {
					localStorage.setItem(LS_USER_KEY, key);
					this.key = key;
					resolve();
				});
		});
	}

	public setCurrentPage(page: string | null) {
		if (!this.key) return;

		gun.get('users').get(this.key).get('currentPage').put(page);
	}

	public setCurrentNode(nodeKey: string | null) {
		if (!this.key) return;

		gun.get('users').get(this.key).get('currentElement').put(nodeKey);
	}
}

const userStore = writable<User>(new User());

async function initUserStore() {
	const user = new User();
	await user.init();
	userStore.set(user);
}

initUserStore();

export { userStore };
