import GUN from 'gun';
import 'gun/sea';
import { browser } from '$app/environment';
console.log('browser', browser, browser ? window.location.host : 'nohost');

export const gun = browser
	? new GUN({ peers: [`http://${window.location.host}/gun`] })
	: global.gun;
