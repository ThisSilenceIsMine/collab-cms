<script lang="ts">
	import type { Node } from '../../lib/Node/node';
	import { NodeType } from '../../lib/Node/nodeType';
	import { Page } from '../../lib/Page';
	import { userStore } from '../../lib/User/User';
	import { getTypeEdit } from '../Node/typeRenderers';
	import CreateNodeMenu from './CreateNodeMenu.svelte';

	import { userActivityStore, type ActivityRecord } from '../../lib/User/activityStore';

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

	const selectNode = (key: string) => {
		userStore.update((u) => u.setCurrentNode(key));
	};

	let userActivities: ActivityRecord = {};

	userActivityStore.subscribe((activity) => {
		userActivities = activity ?? {};
	});

	let focusedNodes: [string, string][] = [];
	$: {
		const usersOnPage = Object.entries(userActivities).filter(
			([id, activity]) => activity.currentPage === path
		);

		const activeNodes = usersOnPage.map(([id, activity]) => [
			activity.name,
			activity.currentElement
		]);

		focusedNodes = activeNodes as [string, string][];
	}
</script>

<div class="flex flex-col gap-4">
	{#each currentNodes as node (node.key)}
		<div class="flex flex-col gap-4 border-2 border-base-100 p-4 rounded-md">
			{#if focusedNodes.find(([, key]) => key === node.key)}
				{#each focusedNodes.filter(([, key]) => key === node.key) as [name, key] (key)}
					<div class="badge badge-primary">{name}</div>
				{/each}
			{/if}
			<div on:focusin={() => selectNode(node.key)}>
				<svelte:component this={getTypeEdit(node.type)} {path} key={node.key} />
			</div>
		</div>
	{/each}

	<CreateNodeMenu on:createNode={(e) => createNode(e.detail.value)} />
</div>
