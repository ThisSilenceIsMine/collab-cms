<script lang="ts">
	import { page } from '$app/stores';
	import Editor from '../../components/Editor/Editor.svelte';

	const path = $page.params.slug;
</script>

<Editor {path} />
