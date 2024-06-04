<script>
	import Catalog from './Catalog.svelte';
</script>

<div class="drawer">
	<input id="sidebar" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<slot />
	</div>
	<div class="drawer-side">
		<label for="sidebar" aria-label="close sidebar" class="drawer-overlay"></label>
		<Catalog />
	</div>
</div>
