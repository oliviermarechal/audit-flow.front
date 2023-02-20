<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import {referentials} from '../../../../../../infra/store/referential.store';
    import VersionForm from '../../../../../../view-components/referential/version/version-form.svelte';
    import Block from '../../../../../../view-components/common/block.svelte';
    import {goto} from '$app/navigation';
    import {fetchReferentials, updateVersion} from '../../../../../../app/actions';
    import {ReferentialVersion} from '../../../../../../domain';

    let referentialId = $page.params.id;
    let versionId = $page.params.versionId;
    let referential;
    let version;

    onMount(async () => {
        referential = $referentials.find(f => f.id === referentialId);
        if (!referential) {
            await fetchReferentials();
            referential = $referentials.find(f => f.id === referentialId);
        }

        version = ReferentialVersion.fromPayload(referential.versions.find(v => v.id === versionId));
    });

    const onCancel = () => {
        goto(`/dashboard/referential/${referentialId}`);
    }

    const handleUpdateVersion = async (version: ReferentialVersion) => {
        const result = await updateVersion(referentialId, version);
        if (result.success) {
            goto(`/dashboard/referential/${referentialId}`);
        }
    }
</script>

<svelte:head>
    <title>Audit flow - Modification de version</title>
</svelte:head>

<div>
    {#if version}
        <h1 class="text-gradient">Référentiel {referential.label} - Version {version.version}</h1>
        <Block>
            <h2>Modifier</h2>
            <hr class="hr-gradient col-12 mb20" />
            <VersionForm referentialId="{referentialId}" version="{version}" onCancel={onCancel} handleSubmitForm={handleUpdateVersion} />
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