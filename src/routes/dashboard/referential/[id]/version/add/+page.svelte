<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import {referentials} from '../../../../../../infra/store/referential.store';
    import VersionForm from '../../../../../../view-components/referential/version/version-form.svelte';
    import Block from '../../../../../../view-components/common/block.svelte';
    import {goto} from '$app/navigation';
    import {ReferentialVersion} from '../../../../../../domain';
    import {fetchReferentials, createVersion} from '../../../../../../app/actions';

    let referentialId = $page.params.id;
    let referential;

    onMount(async () => {
        referential = $referentials.find(f => f.id === referentialId);
        if (!referential) {
            await fetchReferentials();
            referential = $referentials.find(f => f.id === referentialId);
        }
    });

    const onCancel = () => {
        goto(`/dashboard/referential/${referentialId}`);
    }

    const onCreateVersion = async (version: ReferentialVersion) => {
        const {success} = await createVersion(referentialId, version);
        if (success) {
            goto(`/dashboard/referential/${referentialId}`);
        }
    }
</script>

<svelte:head>
    <title>Audit flow - Modification de version</title>
</svelte:head>

<div>
    <h1 class="text-gradient">Référentiel {referential?.label}</h1>
    <Block>
        <h2>Nouvelle version</h2>
        <hr class="hr-gradient col-12 mb20" />
        <VersionForm referentialId={referentialId} onCancel={onCancel} handleSubmitForm={onCreateVersion} />
    </Block>
</div>

<style>
    h1 {
        display: inline-block;
    }
</style>