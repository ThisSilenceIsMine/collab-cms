<script lang="ts">
	import { Page } from '$lib/Page';
	import { type Node } from '$lib/Node/node';

	export let path = '';
	export let key = '';

	const page = new Page(path);

	let self: Node | null = null;

	page.trackNode(key, (node) => {
		self = node;
	});

	$: value = self?.value ?? '';
</script>

<p>{value}</p>
