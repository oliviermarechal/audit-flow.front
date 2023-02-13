<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import {FetchReferentials, referentials} from '../../../../../../libs/store/referential.store';
    import VersionForm from '../../../../../../libs/components/referential/version/version-form.svelte';
    import Block from '../../../../../../libs/components/common/block.svelte';

    let referentialId = $page.params.id;
    let versionId = $page.params.versionId;
    let referential;
    let version;
    onMount(async () => {
        referential = $referentials.find(f => f.id === referentialId);
        if (!referential) {
            await FetchReferentials();
            referential = $referentials.find(f => f.id === referentialId);
        }

        version = referential.versions.find(v => v.id === versionId)
    });

    // Version data
    // version
    // syncMode
    // url
    // versionInUrl
    // referentialId
</script>

<svelte:head>
    <title>Audit flow - Modification de version</title>
</svelte:head>

<div>
    {#if version}
        <h1 class="text-gradient">Version {version.version}</h1>
        <Block>
            <h2>Modifier</h2>
            <hr class="hr-gradient col-12 mb20" />
            <VersionForm referentialId="{referentialId}" version="{version}" />
        </Block>
    {:else}
        Loading...
    {/if}
</div>

<style>
    h1 {
        display: inline-block;
    }
</style>