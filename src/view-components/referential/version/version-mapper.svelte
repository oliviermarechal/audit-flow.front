<script lang="ts">
    import type {ReferentialVersionInterface} from '../../../domain/models';
    import Select from '../../common/form/select.svelte';
    import TerminalVersion from './terminal-version.svelte';
    import OutlinedButton from '../../common/button/outlined-button.svelte';

    export let referentialData: unknown;
    export let apiError: string | undefined;
    export let version: ReferentialVersionInterface;
    let firstRow: unknown;

    const mappingOptions = [
        {key: 'identifier', label: 'Identifiant'},
        {key: 'label', label: 'Label'},
        {key: 'category', label: 'Catégorie'},
        {key: 'description', label: 'Description'},
    ];

    $: if (version.dataMapping?.referentialCriteria && referentialData) {
        let criteriaList = referentialData[version.dataMapping.referentialCriteria];
        if (Array.isArray(criteriaList)) {
            criteriaList = criteriaList[0];
        }

        firstRow = criteriaList;
    }

    const setCriteriaKey = (key: string) => {
        let criteriaList = referentialData[key];
        if (Array.isArray(criteriaList)) {
            criteriaList = criteriaList[0];
        }

        version.dataMapping.referentialCriteria = key;
        firstRow = criteriaList;
    }

    const getUniqueKey = (field: string) => {
        if (version?.id) {
            return `${field}_mapping_${version.id}`;
        }

        return `${field}_mapping`;
    }
</script>

<div>
    {#if !referentialData && !apiError}
        <div></div>
    {:else if referentialData && !version.dataMapping.referentialCriteria}
        <div class="criteria-key-container">
            <div class="m10"><p>Liste des clés JSON retourner par l'url. Veuillez choisir la clé contenant la liste des critères</p></div>
            <div class="m10">
            {#each Object.keys(referentialData) as key}
                {#if typeof referentialData[key] === 'object'}
                    <span class="key-chip" on:click={() => setCriteriaKey(key)}>{key}</span>
                {/if}
            {/each}
            </div>
        </div>
    {:else if !referentialData && apiError}
        <div class="col-12 error">L'url semble incorrect. Erreur: {apiError}</div>
    {:else}
        <div class="col-12">
            <OutlinedButton
                color="secondary"
                on:click={() => version.dataMapping.referentialCriteria = null}
            >
                Changer de clé JSON pour les critères
            </OutlinedButton>
            <div class="col-12 flex flex-wrap mt-15">
                <div class="col-12"><h3>Mapping des données reçus de l'API</h3></div>
                {#each mappingOptions as option}
                    <div class="col-3">
                        <Select key="{getUniqueKey(option.key)}" fullWidth label="{option.label}" color="text-light"
                                bind:element={version.dataMapping[option.key]}>
                            <option value=''>Aucun</option>
                            {#each Object.keys(firstRow) as keyFirstRow}
                                <option value={keyFirstRow}>{keyFirstRow}</option>
                            {/each}
                        </Select>
                    </div>
                {/each}
            </div>
        </div>
        <TerminalVersion version={version} firstRow={firstRow} />
    {/if}
</div>

<style>
    .m10 {
        margin: 10px;
    }

    .mt-15 {
        margin-top: 15px;
    }

    .criteria-key-container {
        background-color: var(--background);
        border-radius: 15px;
        padding: 15px;
        margin-bottom: 20px;
    }

    .key-chip {
        border: 1px solid var(--secondary);
        border-radius: 25px;
        padding: 10px;
        margin-right: 15px;
        height: 20px;
    }

    .key-chip:hover {
        background-color: var(--secondary);
        color: var(--background);
        cursor: pointer;
    }
</style>