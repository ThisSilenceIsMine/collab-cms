<script lang="ts">
	import { Page } from '$lib/Page';
	import { type Node } from '$lib/Node/node';
	import type { FormEventHandler } from 'svelte/elements';
	import { createTrackNodeStore } from '../../../lib/Node/createNodeStore';
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

	const onInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
		debouncedSetContent((e.target as HTMLTextAreaElement).value);
	};

	$: value = self?.value;
</script>

<div class="card">
	<p class="card-title">{self?.key}</p>
	<textarea class="textarea textarea-bordered" {value} on:input={onInput}></textarea>
</div>
