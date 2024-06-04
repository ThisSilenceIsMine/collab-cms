<script lang="ts">
	import { Page } from '$lib/Page';
	import { type Node } from '$lib/Node/node';
	import type { FormEventHandler } from 'svelte/elements';

	export let path = '';
	export let key = '';

	const page = new Page(path);

	let self: Node | null = null;

	$: if (key) {
		page.trackNode(key, (node) => {
			self = node;
		});
	}

	const setContent = (value: string) => {
		if (self) {
			page.updateNode(self.key, { value });
		}
	};

	const onInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
		setContent((e.target as HTMLTextAreaElement).value);
	};

	$: value = self?.value ?? '';
</script>

<div class="card">
	<p class="card-title">{self?.key}</p>
	<textarea class="textarea textarea-bordered" {value} on:input={onInput}></textarea>
</div>
