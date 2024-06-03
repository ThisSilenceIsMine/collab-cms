<script lang="ts">
	import { goto } from '$app/navigation';
  import { page } from '$app/stores'
  import '../app.css'
	import { User } from '$lib/user';
	import { onMount } from 'svelte';

  onMount(() => {
    if(!$page.url.pathname.includes('auth') && !User.getInstance().authorized) {
      goto('/auth/login')
    }
  })
      
</script>

<div class="min-h-screen bg-base-200 text-base-content">
  <nav class="p-4 bg-base-300">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold">CollabCMS</h1>
    </div>
  </nav>
  <main class="container mx-auto p-4">
  </main>
</div>
<!-- 
<main class="w-full h-full">
  <div class="navbar bg-base-200">
    <a class="btn btn-ghost text-xl text-primary" href="/">CMS</a>
  </div>
  <div class="mx-20 my-10">
    <slot></slot>
  </div>
</main> -->


<style lang="postcss">
  :global(html, body, body > div) {
    height: 100%;
  }
</style>
