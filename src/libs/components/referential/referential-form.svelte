<script lang="ts">
    import Input from '../common/form/input.svelte';
    import Checkbox from '../common/form/checkbox.svelte';
    import Block from '../common/block.svelte';
    import Button from '../common/button/outlined-button.svelte';
    import {goto} from '$app/navigation';
    import {Referential} from '../../../domain/models';
    import {apiError, CreateReferential} from "../../store/referential.store";

    export let referential: Referential = new Referential('', '');

    const backToReferential = () => {
        goto('/dashboard/referential');
    }

    const handleSubmitForm = async () => {
        if (referential.isValidToSubmit()) {
            await CreateReferential(referential);
            if (!$apiError) {
                // Goto referential view page with edit and versions management
                return backToReferential();
            }

            // Manage API ERRORS;
            return;
        }

        // Manage required fields
    }
</script>

<section class="col-6">
    <h1>
        {#if referential?.id}
            Modifier un référentiel
        {:else}
            Ajouter un référentiel
        {/if}
    </h1>
    <Block>
        <form on:submit|preventDefault={handleSubmitForm} class="flex-column">
            <Input key="titre" fullWidth label="Titre *" color="text-light" type="text" bind:element={referential.label} />
            <Input key="description" fullWidth label="Description *" color="text-light" type="text" bind:element={referential.description} />
            <Input key="url" fullWidth label="Lien externe" color="text-light" type="text" bind:element={referential.url} />
            <Checkbox label="Accès public" color="primary" bind:element={referential.public} />
            <div class="flex align-end">
                <div class="mr10"><Button color="secondary" on:click={backToReferential}>Annuler</Button></div>
                <Button color="primary" type="submit">Valider</Button>
            </div>
        </form>
    </Block>
</section>

<style>
    .align-end {
        justify-content: flex-end;
    }

    .mr10 {
        margin-right: 10px;
    }

    h1 {
        text-align: center;
    }
</style>