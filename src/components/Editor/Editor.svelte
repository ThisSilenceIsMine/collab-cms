<script lang="ts">
	import type { Node } from '../../lib/Node/node';
	import { NodeType } from '../../lib/Node/nodeType';
	import { Page } from '../../lib/Page';
	import { getTypeEdit } from '../Node/typeRenderers';
	import CreateNodeMenu from './CreateNodeMenu.svelte';

	export let path: string = '';

	const page = path ? new Page(path) : null;

	let currentNodes: Node[] = [];

	$: if (page)
		page.subscribeToNodes((nodes) => {
			currentNodes = nodes;
		});

	const createNode = (type: string) => {
		page &&
			page.addNode({
				type: type as NodeType,
				value: ''
			});
	};
</script>

<div class="flex flex-col gap-4">
	{#each currentNodes as node (node.key)}
		<svelte:component this={getTypeEdit(node.type)} {path} key={node.key} />
	{/each}

	<CreateNodeMenu on:createNode={(e) => createNode(e.detail.value)} />
</div>
