<script lang="ts">
	import { userStore, User } from '../../lib/User/User';

	import { onDestroy, onMount } from 'svelte';
	import { userActivityStore, type ActivityRecord } from '../../lib/User/activityStore';

	let userActivities: ActivityRecord = {};

	const unsub = userActivityStore.subscribe((activity) => {
		userActivities = activity ?? {};
	});

	onDestroy(() => {
		unsub();
	});

	let user: User | null = null;

	const unsubscribe = userStore.subscribe((value) => {
		user = value;
	});

	onMount(() => {
		return () => {
			unsubscribe();
		};
	});

	let username: string = '';

	$: {
		if (user && user.name) {
			username = user.name;
		}
	}
</script>

<div class="navbar bg-base-100">
	<div class="flex-none">
		<label for="sidebar" class="btn btn-square btn-ghost">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block w-5 h-5 stroke-current"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				></path></svg
			>
		</label>
	</div>
	<div class="flex-1">
		<a class="btn btn-ghost text-xl" href="/">Collab CMS</a>
	</div>
	<div>
		<span>{username}</span>
	</div>
</div>
