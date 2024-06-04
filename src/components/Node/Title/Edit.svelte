<script lang="ts">
	import { createTrackNodeStore } from '$lib/Node/createNodeStore';
	import { type Node } from '$lib/Node/node';
	import { onMount } from 'svelte';
	import type { FormEventHandler } from 'svelte/elements';

	export let path = '';
	export let key = '';

	const { self: store, debouncedSetContent } = createTrackNodeStore(path, key);

	let self: Node | null = null;

	onMount(() => {
		const unsubscribe = store.subscribe((node) => {
			self = node;
		});

		return () => {
			unsubscribe();
		};
	});

	const onInput: FormEventHandler<HTMLInputElement> = (e) => {
		debouncedSetContent((e.target as HTMLInputElement).value);
	};

	$: value = self?.value;
</script>

<input class="input input-bordered" {value} on:input={onInput} />
