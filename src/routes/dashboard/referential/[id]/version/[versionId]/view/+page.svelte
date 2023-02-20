<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import {referentials} from '../../../../../../../infra/store/referential.store';
    import Block from '../../../../../../../view-components/common/block.svelte';
    import OutlinedButton from '../../../../../../../view-components/common/button/outlined-button.svelte';
    import {fetchReferentials} from '../../../../../../../app/actions';
    import {
        ReferentialVersion,
        ReferentialSyncModeEnum,
        ReferentialVersionStatusEnum, Criteria,
    } from '../../../../../../../domain';
    import {criteria} from '../../../../../../../infra/store/criteria.store';
    import {
        createCriteria,
        fetchApiCriteriaForVersion,
        listCriteriaForVersion
    } from '../../../../../../../app/actions/criteria.action';
    import Modal from '../../../../../../../view-components/common/modal.svelte';
    import CriteriaForm from '../../../../../../../view-components/referential/criteria/criteria-form.svelte';
    import CriteriaRow from '../../../../../../../view-components/referential/criteria/criteria-row.svelte';
    import {Icon} from 'svelte-awesome';
    import plusCircle from 'svelte-awesome/icons/plusCircle';

    let referentialId = $page.params.id;
    let versionId = $page.params.versionId;
    let referential;
    let version;
    let openCriteriaFormModal = false;

    $: criteriaCollection = $criteria?.find(c => c.versionId === $page.params.versionId)?.criteria;

    onMount(async () => {
        referential = $referentials.find(f => f.id === referentialId);
        if (!referential) {
            await fetchReferentials();
            referential = $referentials.find(f => f.id === referentialId);
        }

        version = ReferentialVersion.fromPayload(referential.versions.find(v => v.id === versionId));
        if (!criteriaCollection?.length) {
            await listCriteriaForVersion(versionId);
        }
    });

    const fetchApiCriteria = async () => {
        if (await fetchApiCriteriaForVersion(versionId)) {
            await listCriteriaForVersion(versionId);
        }
    }

    const addCriteria = async (criteria: Criteria) => {
        await createCriteria(versionId, criteria);
        onClose()
    }

    const onClose = () => {
        openCriteriaFormModal = false;
    }
</script>

<svelte:head>
    <title>Audit flow - Gestion de version</title>
</svelte:head>

<div>
    {#if version}
        <h1 class="text-gradient">Référentiel {referential.label} - Version {version.version}</h1>
        <Block>
            <h2>Critères</h2>
            <hr class="hr-gradient col-12 mb20" />
            {#if version.status === ReferentialVersionStatusEnum.Draft}
                {#if version.syncMode === ReferentialSyncModeEnum.API}
                    {#if criteriaCollection?.length === 0}
                        <OutlinedButton color="secondary" on:click={() => fetchApiCriteria()}>Synchroniser les critères depuis l'api</OutlinedButton>
                    {/if}
                {:else}
                    <span class="icon-plus" on:click={() => openCriteriaFormModal = true}><Icon data={plusCircle} scale="2" label="Ajouter un critère" /></span>
                {/if}
            {/if}
            <table>
                <thead>
                    <tr>
                        <td>Numéro</td>
                        <td>Label</td>
                        <td>Catégorie</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {#each criteriaCollection || [] as criteria}
                        <CriteriaRow criteria={criteria} versionId={versionId} />
                    {/each}
                </tbody>
            </table>
        </Block>
        <Modal title={'Ajouter un critère'} open={openCriteriaFormModal} onClose={onClose} size="xs">
            <CriteriaForm onCancel={onClose} versionId={versionId} onSubmit={addCriteria} />
        </Modal>
    {:else}
        Loading...
    {/if}
</div>

<style>
    h1 {
        display: inline-block;
    }

    .icon-plus {
        color: var(--secondary);
        cursor: pointer;
    }
</style>