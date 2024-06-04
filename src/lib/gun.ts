import GUN, { type IGunInstance } from 'gun';
import 'gun/sea';
import 'gun/lib/then';
import { browser } from '$app/environment';

export const gun: IGunInstance = browser
	? new GUN({ peers: [`http://${window.location.host}/gun`] })
	: //@ts-expect-error VSCode fails to get types
		global.gun;
