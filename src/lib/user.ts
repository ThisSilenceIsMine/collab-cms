import { writable } from 'svelte/store';
import { gun } from './gun';

export const user = gun.user().recall({
	sessionStorage: true
});

export const username = writable('');

user.get('alias').on((v: unknown) => typeof v === 'string' && username.set(v));

gun.on('auth', async (evt) => {
	const { alias } = evt;
	username.set(alias);

	console.log(`signed in as ${alias}`);
});
