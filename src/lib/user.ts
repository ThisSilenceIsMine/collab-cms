import { gun } from './gun';
import type { GunCallbackUserAuth, IGunUserInstance } from 'gun';

// export const user: IGunUserInstance = gun.user().recall({
// 	sessionStorage: true
// });

// export const username = writable('');

// user.get('alias').on((v: unknown) => typeof v === 'string' && username.set(v));

// gun.on('auth', async () => {
// 	console.log('gun.on.auth');
// 	user.get('alias').once((v) => {
// 		username.set(v);
// 		console.log(`signed in as ${v}`);
// 	});
// });

export class User {
	private static instance: User;
	private user: IGunUserInstance;
	private alias: string = '';

	private constructor() {
		this.user = gun.user().recall({
			sessionStorage: true
		});

		this.user.get('alias').on((v: unknown) => typeof v === 'string' && (this.alias = v));

		gun.on('auth', async () => {
			console.log('gun.on.auth');
			this.user.get('alias').once((v) => {
				this.alias = v;
				console.log(`signed in as ${v}`);
			});
		});
	}

	public static getInstance(): User {
		if (!User.instance) {
			User.instance = new User();
		}

		return User.instance;
	}

	public get authorized() {
		return this.user.is;
	}

	public get username() {
		return this.alias;
	}

	public authorize(login: string, password: string, cb: GunCallbackUserAuth) {
		this.user.auth(login, password, cb);
	}
}
