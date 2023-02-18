<script lang="ts">
    import OutlinedButton from '../../common/button/outlined-button.svelte';
    import type {ReferentialVersion} from '../../../domain';
    import {goto} from '$app/navigation';
    import {ReferentialVersionStatusEnum} from '../../../domain';
    import {publishVersion} from '../../../app/actions';

    export let version: ReferentialVersion;

    const goToVersion = () => {
        goto(`/dashboard/referential/${version.referentialId}/version/${version.id}`);
    }

    const onPublishVersion = (versionId: string) => {
        publishVersion(version.referentialId, versionId)
    }
</script>

<div class="version-container col-12">
    <div class="version-block flex space-between">
        <div>{version.version} - {version.status}</div>
        {#if version.status === ReferentialVersionStatusEnum.Draft}
            <div>
                <OutlinedButton on:click={goToVersion} color="primary">Modifier</OutlinedButton>
                <OutlinedButton on:click={() => onPublishVersion(version.id)} color="secondary">Publier</OutlinedButton>
            </div>
        {:else if version.status === ReferentialVersionStatusEnum.Published}
            <div><OutlinedButton on:click={() => console.log('COUCOU')} color="primary">Archiver</OutlinedButton></div>
        {:else if version.status === ReferentialVersionStatusEnum.Archived}
            <div><OutlinedButton on:click={() => onPublishVersion(version.id)} color="secondary">Publier</OutlinedButton></div>
        {/if}
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
</style>