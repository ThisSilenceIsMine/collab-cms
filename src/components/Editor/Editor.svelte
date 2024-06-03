<script lang="ts">
	import { Page } from '$lib/Page';
  import { type Node } from '$lib/Node/node';
  
  const page = new Page('test');

  let nodes: Node[] = [];

  page.subscribeToNodes((newNodes) => {
    console.group("New nodes")
    newNodes.forEach((n) => console.log(n))
    console.groupEnd()

    nodes = newNodes;
  });
</script>

<div>
  <button on:click={() => page.addNode('button')}>Add node</button>

  {#each nodes as node}
    <div class="bg-gray-200 p-4">
      <button on:click={() => page.removeNode(node.key)}>Remove node</button>
      <div>{node.key}</div>
    </div>
 
  {/each}
</div>
