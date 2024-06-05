<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';

	import Sidebar from '../components/Catalog/Sidebar.svelte';
	import Navbar from '../components/Layout/Navbar.svelte';
	import { User } from '../lib/User/User';

	onMount(async () => {
		const user = new User();

		await user.init();

    console.log({ user });
    console.log(user.name);

    username = user.name ?? 'Guest';
	});

	let username = '';
	$: console.log({ username });
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
