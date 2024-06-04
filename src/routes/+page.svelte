<script lang="ts">
	import CreatePageMenu from '../components/Catalog/CreatePageMenu.svelte';
	import { catalogStore } from '../lib/Catalog';
</script>

<div class="flex flex-col gap-4">
	{#each $catalogStore as page (page)}
		<a href={`editor/${page}`} class="btn">{page}</a>
	{/each}
	<CreatePageMenu on:createPage={(e) => catalogStore.createPage(e.detail.title)} />
</div>
