<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const createPage = (title: string) => {
		dispatch('createPage', { title });
	};

	let pageName = '';
</script>

<details class="dropdown">
	<summary class="m-1 btn btn-primary">Create new page</summary>

	<div class="card card-bordered">
		<div class="card-body flex-row">
			<input
				bind:value={pageName}
				type="text"
				placeholder="Page title"
				class="input input-bordered"
			/>
			<button class="btn btn-outline" on:click={() => createPage(pageName)}>Create</button>
		</div>
	</div>
</details>
