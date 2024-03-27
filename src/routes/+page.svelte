<script lang="ts">
    import {gun} from '../lib/gun';

    const sharedTextNode = gun.get('text');

    let textValue = "";

    sharedTextNode.get("message").on(data => {
        console.log('new data', data);
        if (data.text !== textValue) {
            textValue = data.text;
        }
    });


    $: if (textValue) {
				console.log("CHANGED", textValue)
        sharedTextNode.get('message').put({ text: textValue });
    }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<textarea bind:value={textValue}></textarea>
