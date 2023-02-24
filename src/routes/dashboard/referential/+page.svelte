<script lang="ts">
	import { referentials } from '../../../infra/store/referential.store';
	import Button from '../../../view-components/common/button/outlined-button.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import OutlinedButton from '../../../view-components/common/button/outlined-button.svelte';
	import { fetchReferentials } from '../../../app/actions';

	onMount(() => {
		fetchReferentials();
	});

	const goToReferential = (id: string) => {
		goto(`/dashboard/referential/${id}`);
	};
</script>

<svelte:head>
	<title>Audit flow - Référentiel</title>
</svelte:head>

<section class="referential">
	<h1 class="text-gradient">Référentiels</h1>
	<div class="headblock flex">
		<Button color="primary" on:click={() => goto('/dashboard/referential/add')}>Nouveau</Button>
	</div>
	<div class="flex col-12">
		{#each $referentials as referential}
			<div class="col-3">
				<div class="referential-element flex-column text-center">
					<h3 class="color-grey ref-title">{referential.label}</h3>
					<hr class="hr-gradient col-12 mb20" />
					<span class="mb20">{referential.isPublic ? 'Public' : 'Privé'}</span>
					{#if referential.ownerId}
						<span class="mb20">Propriétaire: TODO</span>
					{/if}

					{#if referential.versions?.length > 0}
						<span class="mb20">Nombre de versions: {referential.versions.length}</span>
					{:else}
						<span class="mb20">Pas encore de version</span>
					{/if}
					<OutlinedButton color="primary" on:click={() => goToReferential(referential.id)}
						>Configurer</OutlinedButton
					>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	h1 {
		display: inline-block;
		font-size: 2em;
	}

	.headblock {
		justify-content: flex-start;
		margin-bottom: 20px;
		margin-left: 15px;
	}

	.ref-title {
		margin-bottom: 5px;
		margin-top: 10px;
	}

	.referential-element {
		background-color: var(--background-card);
		padding: 20px;
		border-radius: 15px;
		margin: 10px;
		justify-content: center;
	}

	section.referential {
		margin: 0 15px;
	}

	.color-grey {
		color: var(--bs-gray-500);
	}

	.mb20 {
		margin-bottom: 20px;
	}
</style>
