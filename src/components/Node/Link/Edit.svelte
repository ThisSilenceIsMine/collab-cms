<script lang="ts">
	import { Page } from '$lib/Page';
	import { type Node } from '$lib/Node/node';
	import type { FormEventHandler } from 'svelte/elements';
	import { createTrackNodeStore } from '$lib/Node/createNodeStore';
	import { onMount } from 'svelte';

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

	$: value = self?.value ?? '';

	$: isValidUrl = value.match(/https?:\/\/.+/);
</script>

<input class="input input-bordered" class:input-error={!isValidUrl} {value} on:input={onInput} />
