<script lang="ts">
	import { NodeType } from '../../lib/Node/nodeType';

	const glob = import.meta.glob<true, string, { default: ConstructorOfATypedSvelteComponent }>(
		'../Node/**/Edit.svelte',
		{ eager: true }
	);

	const nodeTypes = Object.keys(NodeType);

	const nodeTypeToEditComponent = nodeTypes.reduce(
		(acc, nodeType) => {
			const editComponent = Object.entries(glob).find(([key, value]) =>
				key.toLowerCase().includes(nodeType.toLowerCase())
			)?.[1]?.default;

			if (editComponent) {
				acc[nodeType] = editComponent;
			}

			return acc;
		},
		{} as Record<string, ConstructorOfATypedSvelteComponent>
	);
</script>

<div>
	{#each Object.entries(nodeTypeToEditComponent) as [nodeType, EditComponent]}
		<EditComponent key={nodeType} path="vitest" />
	{/each}
</div>
