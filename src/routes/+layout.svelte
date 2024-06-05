<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';

	import Sidebar from '../components/Catalog/Sidebar.svelte';
	import Navbar from '../components/Layout/Navbar.svelte';
	import { userStore, User } from '../lib/User/User';

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

<div class="min-h-screen bg-base-200 text-base-content">
	<Navbar {username} />
	<main class="container mx-auto p-4">
		<Sidebar>
			<slot />
		</Sidebar>
	</main>
</div>

<style lang="postcss">
	:global(html, body, body > div) {
		height: 100%;
	}
</style>
