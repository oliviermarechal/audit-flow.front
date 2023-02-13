<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import {FetchReferentials, referentials} from '../../../../libs/store/referential.store';
    import Block from '../../../../libs/components/common/block.svelte';
    import ReferentialForm from '../../../../libs/components/referential/referential-form.svelte';
    import VersionEmbed from '../../../../libs/components/referential/version/version-embed.svelte';
    import {Referential} from '../../../../domain/models';

    let open;
    let referential;
    onMount(async () => {
        referential = $referentials.find(f => f.id === $page.params.id);
        if (!referential) {
            await FetchReferentials();
            referential = $referentials.find(f => f.id === $page.params.id);
        }
    });

    // Version data
    // version
    // syncMode
    // url
    // versionInUrl
    // referentialId
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
                <div>
                    {#each referential?.versions as version}
                        <VersionEmbed version={version} />
                    {/each}
                </div>
            </Block>
        </div>
    {:else}
        <div>Loading ... TODO Loader</div>
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