<script lang="ts">
    import {referentials, FetchReferentials} from '../../../libs/store/referential.store';
    import Block from '../../../libs/components/common/block.svelte';
    import Button from '../../../libs/components/common/button/outlined-button.svelte';
    import { onMount } from 'svelte';
    import {goto} from '$app/navigation';

    onMount(() => {
        FetchReferentials();
    });
</script>

<svelte:head>
    <title>Audit flow - Référentiel</title>
</svelte:head>

<section class="referential flex-column">
    <h1>Référentiels</h1>
    <Block>
        <div class="headblock flex">
            <Button color="primary" on:click={() => goto('/dashboard/referential/add')}>Nouveau</Button>
        </div>
        <div class="flex col-12">
            {#each $referentials as referential}
                <div class="col-6">
                    <div class="referential-element">
                        <h3 class="color-secondary">{referential.label}</h3>
                        <h4 class="color-grey">{referential.description}</h4>
                        {#each referential.versions as version}
                            <div class="mt10">
                                <div class="ref-version-container">
                                    <div>{version.version}</div>
                                </div>
                            </div>
                            <hr class="hr-gradient" />
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </Block>
</section>

<style>
    .headblock {
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .referential-element {
        background-color: var(--background);
        padding: 20px;
        border-radius: 15px;
        margin: 10px;
    }

    section.referential {
        margin: 0 15px;
    }

    .color-grey {
        color: var(--bs-gray-500);
    }

    .ref-version-container {
        padding: 10px;
    }

    .mt10 {
        margin-top: 10px;
    }
</style>