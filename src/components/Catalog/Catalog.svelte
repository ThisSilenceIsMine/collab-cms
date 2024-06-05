<script lang="ts">
	import { catalogStore } from '../../lib/Catalog';
	import { userStore } from '../../lib/User/User';
	import CreatePageMenu from './CreatePageMenu.svelte';

	const onPageSelect = (page: string) => {
		userStore.update((u) => u.setCurrentPage(page));
	};
</script>

<div class="flex flex-col gap-4 bg-base-200 h-full p-6">
	<span class="text-xl text-base-content">Available pages:</span>
	{#each $catalogStore as page (page)}
		<a on:click={() => onPageSelect(page)} href={`editor/${page}`} class="btn btn-ghost max-w-44"
			>{page}</a
		>
	{/each}
	<CreatePageMenu on:createPage={(e) => catalogStore.createPage(e.detail.title)} />
</div>
