import { writable } from 'svelte/store';
import { gun } from '../gun';

export type UserActivity = {
	currentPage: string;
	currentElement: string;
};

export type ActivityRecord = Record<string, UserActivity>;

const createUserActivityStore = () => {
	const { subscribe, set } = writable<ActivityRecord>({});

	const subscribeToUsers = () => {
		const userActivity = new Map<string, UserActivity>();

		gun
			.get('users')
			.map()
			.on((user, id) => {
				userActivity.set(id, user);

				set(Object.fromEntries(userActivity.entries()));
			});
	};

	subscribeToUsers();

	return {
		subscribe
	};
};

export const userActivityStore = createUserActivityStore();
