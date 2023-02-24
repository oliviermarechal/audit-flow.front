<script lang="ts">
	import OutlinedButton from '../../common/button/outlined-button.svelte';
	import Confirm from '../../common/confirm/confirm.svelte';
	import type { ReferentialVersion } from '../../../domain';
	import { goto } from '$app/navigation';
	import { ReferentialVersionStatusEnum } from '../../../domain';
	import {publishVersion, removeVersion} from '../../../app/actions';
    import { Icon } from 'svelte-awesome';
    import trashO from 'svelte-awesome/icons/trashO';
    import pencil from 'svelte-awesome/icons/pencil';

	export let version: ReferentialVersion;

	const goToVersion = () => {
		goto(`/dashboard/referential/${version.referentialId}/version/${version.id}/view`);
	};

	const onPublishVersion = (versionId: string) => {
		publishVersion(version.referentialId, versionId);
	};

    const deleteVersion = (versionId: string) => {
		openConfirmationModal = false;
		removeVersion(version.referentialId, versionId);
    }

	$: openConfirmationModal = false;
</script>

<div class="version-container col-12">
	<div class="version-block flex space-between">
		<div>{version.version} - {version.status}</div>
		{#if version.status === ReferentialVersionStatusEnum.Draft}
			<div>
                <span class="icon-color-primary mr-10" on:click={goToVersion}>
                    <Icon data={pencil} scale="1.5" label={`Modifier la version ${version.version}`} />
                </span>
                <span class="icon-color-danger" on:click={() => openConfirmationModal = true}>
                    <Icon data={trashO} scale="1.5" label={`Supprimer la version ${version.version}`} />
                </span>
			</div>
		{:else if version.status === ReferentialVersionStatusEnum.Published}
			<div>
				<OutlinedButton on:click={() => console.log('COUCOU')} color="primary"
					>Archiver</OutlinedButton
				>
			</div>
		{:else if version.status === ReferentialVersionStatusEnum.Archived}
			<div>
				<OutlinedButton on:click={() => onPublishVersion(version.id)} color="secondary"
					>Publier</OutlinedButton
				>
			</div>
		{/if}
		<Confirm
			open={openConfirmationModal}
			confirm={() => deleteVersion(version.id)}
			cancel={() => openConfirmationModal = false}
			title="Confirmation suppression"
			cancelColor="primary"
			confirmColor="danger"
		>
			Confirmez-vous la suppresion de la version {version.version} ?
		</Confirm>
	</div>
</div>

<style>
	.version-block {
		padding: 15px;
	}

	.version-container {
		border-radius: 15px;
		background-color: var(--background);
		margin-bottom: 10px;
	}

    .icon-color-primary {
        color: var(--primary);
		cursor: pointer;
    }

    .icon-color-danger {
        color: var(--danger);
		cursor: pointer;
    }

    .mr-10 {
        margin-right: 10px;
    }
</style>
