<script lang="ts">
    import { gun } from '../lib/gun';

    const sharedTextNode = gun.get('text');

    let textValue = "";

    sharedTextNode.get("message").on(data => {
        if (data.text !== textValue) {
            textValue = data.text;
        }
    });


    $: if (textValue) {
        sharedTextNode.get('message').put({ text: textValue });
    }
</script>

<textarea bind:value={textValue}></textarea>
