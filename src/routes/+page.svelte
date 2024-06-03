<script lang="ts">

    import { Page } from '$lib/Page';
    import { type Node } from '$lib/Node/node';
	import Edit from '../components/Node/Text/Edit.svelte';
    
    const path = 'page1'
    
    const page = new Page(path);

    let nodes: Node[] = [];

    page.subscribeToNodes((newNodes) => {
        nodes = newNodes;
    });

    $: console.log({nodes});

    const addNode = () => {
        page.addNode({type: 'text', value: 'New text node'});
    }
</script>


<div class="p-4 shadow rounded">
    <button class="btn btn-primary" on:click={addNode}>Add node</button>
    <div class="flex flex-col gap-2">

        {#each nodes as node}
        <Edit key={node.key} path={path}/>
        {/each}
    </div>
</div>
