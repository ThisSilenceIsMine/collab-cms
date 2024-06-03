<script lang="ts">
  import { Page } from '$lib/Page';
  import { type Node } from '$lib/Node/node';
	import type { FormEventHandler } from 'svelte/elements';

  export let path = '';
  export let key = '';

  const page = new Page(path);

  let self: Node | null = null;
  
  $: if(key) {
    page.trackNode(key, (node) => {
      self = node;
    });
  }

  const setContent = (value: string) => {
    if (self) {
      page.updateNode(self.key, {value})
    }
  };

  const onInput: FormEventHandler<HTMLInputElement> = (e) => {
    setContent((e.target as HTMLInputElement).value);
  };

  $: value = self?.value ?? '';

  $: isValidUrl = value.match(/https?:\/\/.+/);
</script>

<input class="input input-bordered" class:input-error={!isValidUrl} value={value} on:input={onInput}/>
