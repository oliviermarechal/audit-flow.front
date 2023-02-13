<script lang="ts">
    import Input from '../common/form/input.svelte';
    import Checkbox from '../common/form/checkbox.svelte';
    import Button from '../common/button/outlined-button.svelte';
    import {goto} from '$app/navigation';
    import {Referential} from '../../../domain/models';
    import {apiError, CreateReferential} from '../../store/referential.store';

    export let referential: Referential = new Referential('', '');
    export let showCancel = true;

    const backToReferential = () => {
        goto('/dashboard/referential');
    }

    const goToReferentialPage = (id: string | null | undefined) => {
        if (id) {
            goto(`/dashboard/referential/${id}`);
        }
    }

    const handleSubmitForm = async () => {
        if (referential.isValidToSubmit()) {
            const isEdit = referential.hasId();
            let saved: Referential | void;
            if (!isEdit) {
                saved = await CreateReferential(referential);
            } else {
                console.log(referential);
            }

            if (!$apiError) {
                if (!isEdit && saved) {
                    // Goto referential view page with edit and versions management
                    return goToReferentialPage(saved.id);
                }
            }

            // Manage API ERRORS;
            return;
        }

        // Manage required fields
    }
</script>

<form on:submit|preventDefault={handleSubmitForm} class="flex-column">
    <Input key="titre" fullWidth label="Titre" required color="text-light" type="text" bind:element={referential.label} />
    <Input key="description" fullWidth label="Description" required color="text-light" type="text" bind:element={referential.description} />
    <Input key="url" fullWidth label="Lien externe" color="text-light" type="text" bind:element={referential.url} />
    <Checkbox label="Accès public" color="primary" bind:element={referential.isPublic} />
    <div class="flex align-end">
        {#if showCancel}
            <div class="mr10">
                <Button color="secondary" on:click={backToReferential}>Annuler</Button>
            </div>
        {/if}
        <Button color="primary" type="submit">Valider</Button>
    </div>
</form>

<style>
    .align-end {
        justify-content: flex-end;
    }

    .mr10 {
        margin-right: 10px;
    }
</style>