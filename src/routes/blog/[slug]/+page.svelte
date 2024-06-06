<script lang="ts">
	import { page } from '$app/stores';
	import Display from '../../../components/Display/Display.svelte';

	const path = $page.params.slug;
</script>

<Display {path} />
