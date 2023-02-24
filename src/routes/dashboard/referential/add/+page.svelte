<script lang="ts">
	import ReferentialForm from '../../../../view-components/referential/referential-form.svelte';
	import Block from '../../../../view-components/common/block.svelte';
</script>

<svelte:head>
	<title>Audit flow - Créer un référentiel</title>
</svelte:head>

<div class="ref-form">
	<Block width="col-6">
		<h1 class="text-center">Ajouter un référentiel</h1>
		<hr class="hr-gradient col-12 mb20" />
		<ReferentialForm />
	</Block>
</div>

<style>
	.ref-form {
		display: flex;
		justify-content: center;
		width: 100%;
	}
</style>
