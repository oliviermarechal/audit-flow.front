<script lang="ts">
    import {Criteria} from '../../../domain';
    import Input from '../../common/form/input.svelte';
    import OutlinedButton from '../../common/button/outlined-button.svelte';

    export let versionId;
    export let criteria = Criteria.fromPayload({
        label: '',
        externalId: '',
        versionId
    });

    export let onSubmit;
    export let onCancel;
</script>

<form on:submit|preventDefault={() => onSubmit(criteria)} class="flex-column">
    <Input key="externalId" fullWidth label="Numéro" required color="text-light" type="text"
           bind:element={criteria.externalId}/>
    <Input key="label" fullWidth label="Label" required color="text-light" type="text"
           bind:element={criteria.label}/>
    <Input key="category" fullWidth label="Catégorie" color="text-light" type="text"
           bind:element={criteria.category} />
    <Input key="description" fullWidth label="Description" color="text-light" type="text"
           bind:element={criteria.description} />
    <div class="flex align-end">
        <div class="mr10">
            <OutlinedButton color="secondary" on:click={onCancel}>Annuler</OutlinedButton>
        </div>
        <OutlinedButton color="primary" type="submit">Valider</OutlinedButton>
    </div>
</form>

<style>
    .mr10 {
        margin-right: 10px;
    }

    .align-end {
        justify-content: flex-end;
    }
</style>