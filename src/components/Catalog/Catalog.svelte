<script lang="ts">
	import { catalogStore } from '../../lib/Catalog';
	import CreatePageMenu from './CreatePageMenu.svelte';
</script>

<div class="flex flex-col gap-4">
	<span>Available pages:</span>
	{#each $catalogStore as page (page)}
		<a href={`editor/${page}`} class="btn btn-link max-w-44">{page}</a>
	{/each}
	<CreatePageMenu on:createPage={(e) => catalogStore.createPage(e.detail.title)} />
</div>
