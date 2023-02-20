<script lang="ts">
    import { page } from '$app/stores';
    import {referentials} from '../../../../infra/store/referential.store';
    import Block from '../../../../view-components/common/block.svelte';
    import ReferentialForm from '../../../../view-components/referential/referential-form.svelte';
    import VersionEmbed from '../../../../view-components/referential/version/version-embed.svelte';
    import {Referential, ReferentialVersionStatusEnum} from '../../../../domain';
    import OutlinedButton from '../../../../view-components/common/button/outlined-button.svelte';
    import {goto} from '$app/navigation';
    import {fetchReferentials} from '../../../../app/actions';

    $: referential = $referentials.find(f => f.id === $page.params.id);
    if (!referential) {
        fetchReferentials();
    }

    $: filteredVersions = () => {
        if (referential) {
            const filtered = referential.versions?.filter(v => {
                if (displayArchived) {
                    return v.status === ReferentialVersionStatusEnum.Archived;
                } else {
                    return v.status !== ReferentialVersionStatusEnum.Archived;
                }
            });

            return filtered.sort((a, b) => {
                return new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime() ? -1 : +1;
            })
        }

        return [];
    }

    $: displayArchived = false;
    const addVersion = () => {
        goto(`/dashboard/referential/${$page.params.id}/version/add`);
    }
</script>

<svelte:head>
    <title>Audit flow - {referential ? referential.label : "Réferentiel"}</title>
</svelte:head>

<div>
    {#if referential}
        <h1 class="text-gradient">{referential.label}</h1>
        <div class="flex col-12">
            <Block width="col-6">
                <h2 class="color-grey ref-title">Modifier</h2>
                <hr class="hr-gradient col-12 mb20" />
                <ReferentialForm referential={Referential.fromPayload(referential)} showCancel={false} />
            </Block>
            <Block width="col-6">
                <h2 class="color-grey ref-title">Versions</h2>
                <hr class="hr-gradient col-12 mb20" />

                <OutlinedButton color="primary" on:click={() => displayArchived = !displayArchived}>{displayArchived ? 'Retour' : 'Voir les archives'}</OutlinedButton>
                <div>
                    {#if filteredVersions().length > 0}
                        {#each filteredVersions() as version}
                            <VersionEmbed version={version} />
                        {/each}
                    {:else}
                        <div>Aucune version</div>
                    {/if}
                    <OutlinedButton on:click={addVersion} color="primary">Ajouter</OutlinedButton>
                </div>
            </Block>
        </div>
    {:else}
        <div>Loading ...</div>
    {/if}
</div>

<style>
    h1 {
        display: inline-block;
    }

    .ref-title {
        margin-bottom: 5px;
        margin-top: 10px;
    }

    .mb20 {
        margin-bottom: 20px;
    }
</style>