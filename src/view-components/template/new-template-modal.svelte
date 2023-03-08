<script lang="ts">
    import Modal from '../common/modal.svelte';
    import Input from '../common/form/input.svelte';
    import Select from '../common/form/select.svelte';
    import OutlinedButton from '../common/button/outlined-button.svelte';
    import {Template} from '../../domain/models/template';
    import {onMount} from 'svelte';
    import {referentials} from '../../infra/store/referential.store';
    import {fetchReferentials} from '../../app/actions';
    import {ReferentialVersionStatusEnum} from '../../domain';
    import {createTemplate} from '../../app/actions/template.action';
    import {goto} from '$app/navigation';

    onMount(() => {
        if ($referentials?.length === 0) {
            fetchReferentials();
        }
    });

    export let open: boolean;
    export let onClose: () => unknown;
    $: referentialId = false;

    let template = Template.fromPayload({versionId: '', name: ''});

    const reset = () => {
        template = Template.fromPayload({versionId: '', name: ''});
    }
    const onFormSubmit = async () => {
        const result = await createTemplate(template);
        if (result.success) {
            goto(`/dashboard/template/${result.data.id}`);
        } else {
            console.log('MANAGE ERREUR')
        }
    }
</script>

<Modal open={open} onClose title="Nouveau template" size="xs">
    <form on:submit|preventDefault={() => onFormSubmit()} class="flex flex-wrap">
        <Input
            key="name"
            fullWidth
            label="Nom"
            required
            color="text-light"
            type="text"
            bind:element={template.name}
        />
        <div class="col-6">
            <Select
                key='versionId'
                fullWidth
                label='Référential'
                color="text-light"
                bind:element={referentialId}
            >
                {#each $referentials as referential}
                    {#if referential.versions.filter(v => v.status === ReferentialVersionStatusEnum.Published).length > 0}
                        <option value={referential.id}>{referential.label}</option>
                    {/if}
                {/each}
            </Select>
        </div>
        <div class="col-6">
            {#if referentialId}
                <Select
                    key='versionId'
                    fullWidth
                    label='Version'
                    color="text-light"
                    bind:element={template.versionId}
                >
                    {#each $referentials.find(r => r.id === referentialId).versions as version}
                        {#if version.status === ReferentialVersionStatusEnum.Published}
                            <option value={version.id}>{version.version}</option>
                        {/if}
                    {/each}
                </Select>
            {/if}
        </div>
        <div class="col-12 flex align-end">
            <div class="mr10">
                <OutlinedButton
                    color="secondary"
                    on:click={() => {
                        reset()
                        onClose()
				    }}
                >Annuler</OutlinedButton>
            </div>
            <OutlinedButton color="primary" type="submit">Valider</OutlinedButton>
        </div>
    </form>
</Modal>

<style>
    .mr10 {
        margin-right: 10px;
    }

    .align-end {
        justify-content: flex-end;
    }
</style>