<script lang="ts">
    import OutlinedButton from '../../common/button/outlined-button.svelte';
    import type {ReferentialVersion} from '../../../../domain/models';
    import {goto} from "$app/navigation";

    export let version: ReferentialVersion;

    const goToVersion = () => {
        const referentialId = version.referentialId;
        const versionId = version.id;
        goto(`/dashboard/referential/${referentialId}/version/${versionId}`);
    }
</script>

<div class="version-container col-12">
    <div class="version-block flex space-between">
        <div>{version.version}</div>
        <div><OutlinedButton on:click={goToVersion} color="primary">Modifier</OutlinedButton></div>
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