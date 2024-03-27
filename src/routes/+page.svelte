<script lang="ts">
	import Gun from 'gun';
	const gun = Gun();

	const sharedTextNode = gun.get('text');

	let textValue = '';

	sharedTextNode.on((data) => {
		console.log('new data', data);
		textValue = data.text;
	});

	$: if (textValue) {
		sharedTextNode.put({ text: textValue });
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<textarea bind:value={textValue}></textarea>
