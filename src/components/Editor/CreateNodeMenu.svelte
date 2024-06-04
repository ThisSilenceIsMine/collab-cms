<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { NodeType } from '../../lib/Node/nodeType';

	const nodeTypes = Object.keys(NodeType);

	const dispatch = createEventDispatcher();

	function createNode(type: string) {
		dispatch('createNode', { value: type });
	}
</script>

<details class="dropdown">
	<summary class="m-1 btn">Create new element</summary>
	<ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
		{#each nodeTypes as type}
			<li>
				<a on:click={createNode.bind(null, type)}>{type}</a>
			</li>
		{/each}
	</ul>
</details>
