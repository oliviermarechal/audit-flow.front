<script lang="ts">
    import {page} from '$app/stores';
    import {referentials} from '../../../../../../../infra/store/referential.store';
    import Block from '../../../../../../../view-components/common/block.svelte';
    import OutlinedButton from '../../../../../../../view-components/common/button/outlined-button.svelte';
    import {
        ReferentialVersion,
        ReferentialSyncModeEnum,
        ReferentialVersionStatusEnum,
        Criteria
    } from '../../../../../../../domain';
    import {criteria} from '../../../../../../../infra/store/criteria.store';
    import {
        createCriteria,
        fetchApiCriteriaForVersion,
        listCriteriaForVersion,
        publishVersion,
        fetchReferentials
    } from '../../../../../../../app/actions';
    import Modal from '../../../../../../../view-components/common/modal.svelte';
    import CriteriaForm from '../../../../../../../view-components/referential/criteria/criteria-form.svelte';
    import CriteriaRow from '../../../../../../../view-components/referential/criteria/criteria-row.svelte';

    let referentialId = $page.params.id;
    let versionId = $page.params.versionId;
    let referential;
    let version: ReferentialVersion;
    let openCriteriaFormModal = false;

    $: criteriaCollection = $criteria?.find((c) => c.versionId === $page.params.versionId)?.criteria;

    $: referential = $referentials.find((f) => f.id === referentialId);
    if (!referential) {
        fetchReferentials().then(() => {
            referential = $referentials.find((f) => f.id === referentialId);
        })
    }

    $: if (referential) {
        version = ReferentialVersion.fromPayload(referential.versions.find((v) => v.id === versionId));
        if (!criteriaCollection?.length) {
            listCriteriaForVersion(versionId);
        }
    }

    const fetchApiCriteria = async () => {
        if (await fetchApiCriteriaForVersion(versionId)) {
            await listCriteriaForVersion(versionId);
        }
    };

    const addCriteria = async (criteria: Criteria) => {
        await createCriteria(versionId, criteria);
        onClose();
    };

    const onClose = () => {
        openCriteriaFormModal = false;
    };
</script>

<svelte:head>
    <title>Audit flow - Gestion de version</title>
</svelte:head>

<div>
    {#if version}
        <h1 class="text-gradient">Référentiel {referential.label} - Version {version.version}</h1>
        <div class="col-12 flex flex-wrap">
            <div class="col-12 flex justify-between">
                <div class="head-block col-3 text-center">
                    Template(s): <div class="head-block-info">0</div>
                    <div class="mt10">
                        <OutlinedButton disabled color="primary">Voir les templates</OutlinedButton>
                    </div>
                </div>
                <div class="head-block col-3 text-center">
                    État: <div class="head-block-info">{version.humanizeStatus()}</div>
                    <div class="mt10">
                        {#if version.status === ReferentialVersionStatusEnum.Draft}
                            <OutlinedButton color="primary" on:click={() => publishVersion(referentialId, versionId)}>Publier</OutlinedButton>
                        {:else if version.status === ReferentialVersionStatusEnum.Published}
                            <OutlinedButton disabled color="primary">Archiver (TODO)</OutlinedButton>
                        {/if}
                    </div>
                </div>
                <div class="head-block col-3 text-center">
                    Version créer le <div class="head-block-info">{new Date(version.createdAt).toLocaleDateString()}</div>
                    <div class="mt10">
                        <OutlinedButton color="primary">Modifier</OutlinedButton>
                    </div>
                </div>
            </div>
            <Block>
                <h2 id="title-criteria" class="text-center">Gestion des critères</h2>
                <hr class="hr-gradient col-12 mb20" />
                {#if version.status === ReferentialVersionStatusEnum.Draft}
                    {#if version.syncMode === ReferentialSyncModeEnum.API}
                        {#if criteriaCollection?.length === 0}
                            <OutlinedButton color="secondary" on:click={() => fetchApiCriteria()}>
                                Synchroniser les critères depuis l'api
                            </OutlinedButton>
                        {/if}
                    {:else}
                        <OutlinedButton color="primary" on:click={() => (openCriteriaFormModal = true)}>
                            Ajouter un critère
                        </OutlinedButton>
                    {/if}
                {/if}
                <table class="col-12 criteria-table" aria-describedby="title-criteria" role="tablist">
                    <thead>
                    <tr>
                        <th scope="col">Numéro</th>
                        <th scope="col">Label</th>
                        <th scope="col">Catégorie</th>
                        {#if version.status !== ReferentialVersionStatusEnum.Published}
                            <th scope="col">Action</th>
                        {/if}
                    </tr>
                    </thead>
                    <tbody>
                    {#each Object.keys(criteriaCollection || []) as criteriaKey}
                        <tr>
                            <CriteriaRow criteria={criteriaCollection[criteriaKey]} {version}/>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </Block>
        </div>
        <Modal title={'Ajouter un critère'} open={openCriteriaFormModal} {onClose} size="xs">
            <CriteriaForm onCancel={onClose} {versionId} onSubmit={addCriteria}/>
        </Modal>
    {:else}
        Loading...
    {/if}
</div>

<style>
    tbody > tr:nth-child(odd) {
        background: var(--background);
    }

    .justify-between {
        justify-content: space-between;
    }

    th {
        vertical-align: baseline;
        text-align: center;
        line-height: 40px;
    }

    thead > tr {
        border-bottom: 2px solid var(--primary);
    }

    h1 {
        display: inline-block;
    }

    h2 {
        margin-top: 0;
    }

    .criteria-table {
        border-collapse: collapse;
    }

    .head-block-info {
        font-size: 50px;
        color: var(--secondary);
        margin-top: 15px;
    }

    .head-block {
        background-color: var(--background-card);
        padding: 2rem 1.5rem;
        margin: 5px;
        border-radius: 15px;
        height: 15vh;
    }

    .mt10 {
        margin-top: 10px;
    }
</style>
