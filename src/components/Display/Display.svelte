<script lang="ts">
	import type { Node } from '../../lib/Node/node';
	import { Page } from '../../lib/Page';
	import { getTypeView } from '../Node/typeRenderers';

	export let path: string = '';

	const page = path ? new Page(path) : null;

	let currentNodes: Node[] = [];

	$: if (page)
		page.subscribeToNodes((nodes) => {
			currentNodes = nodes;
		});
</script>

<div class="flex flex-col gap-4">
	{#each currentNodes as node (node.key)}
		<svelte:component this={getTypeView(node.type)} {path} key={node.key} />
	{/each}
</div>
