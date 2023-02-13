<script lang="ts">
    import type {ReferentialVersionInterface} from '../../../../domain/models';
    import OutlinedButton from '../../common/button/outlined-button.svelte';

    enum State {
        Waiting = 'Waiting',
        Fetch = 'Fetch',
        Success = 'Success',
        Fail = 'Fail',
        BadMapping = 'BadMapping',
    }

    export let version: ReferentialVersionInterface;
    let state: State = State.Waiting;
    let error: string;
    let referentialData: unknown;
    let firstRow: unknown;

    const onTestApi = async () => {
        state = State.Fetch;
        if (!version.url) {
            state = State.Fail;
            error = 'Vous devez renseigner l\'URL de l\'api avant de pouvoir tester l\'appel HTTP';

            return;
        }

        try {
            referentialData = await (await fetch(version.url as URL)).json();
            const criteriaIndex = version.dataMapping?.referentialCriteria;
            if (criteriaIndex && referentialData[criteriaIndex]) {
                firstRow = referentialData[criteriaIndex][0];
                state = State.Success;
            } else {
                state = State.BadMapping;
            }
        } catch (e) {
            state = State.Fail
            error = e.message;
        }
    }

    const concatIfTooLong = (term: string) => {
        if (term.length > 75) {
            term = term.substring(0, 75);
            term += '(...)';
        }

        return term;
    }
</script>

<div class="col-12 terminal">
    <div class="terminal-content">
        {#if state === State.Waiting}
            > En attente
        {:else if state === State.Fetch}
            > Appel HTTP sur l'url {version.url} en cours...
        {:else if state === State.Fail}
            <div class="terminal-error"> > Erreur: {error}</div>
        {:else if state === State.Success}
            <div> > Résultat:</div>
            {#if firstRow[version.dataMapping.identifier] !== undefined}
                <div> > <span
                        class="terminal-tab">identifiant: {concatIfTooLong(firstRow[version.dataMapping.identifier])}</span>
                </div>
            {:else}
                <div> > <span class="terminal-tab terminal-error">identifiant: {version.dataMapping.identifier} ne donne rien</span>
                </div>
            {/if}
            {#if firstRow[version.dataMapping.label] !== undefined}
                <div> > <span class="terminal-tab">label: {concatIfTooLong(firstRow[version.dataMapping.label])}</span>
                </div>
            {:else}
                <div> > <span
                        class="terminal-tab terminal-error">label: {version.dataMapping.label} ne donne rien</span>
                </div>
            {/if}
            {#if firstRow[version.dataMapping.category] !== undefined}
                <div> > <span
                        class="terminal-tab">category: {concatIfTooLong(firstRow[version.dataMapping.category])}</span>
                </div>
            {:else}
                <div> > <span
                        class="terminal-tab terminal-error">category: {version.dataMapping.category} ne donne rien</span>
                </div>
            {/if}
            {#if firstRow[version.dataMapping.description] !== undefined}
                <div> > <span
                        class="terminal-tab">description: {concatIfTooLong(firstRow[version.dataMapping.description])}</span>
                </div>
            {:else}
                <div> > <span
                        class="terminal-tab terminal-error">description: {version.dataMapping.description} ne donne rien</span>
                </div>
            {/if}
            {#if firstRow[version.dataMapping.implement] !== undefined}
                <div> > <span
                        class="terminal-tab">implement: {concatIfTooLong(firstRow[version.dataMapping.implement])}</span>
                </div>
            {:else}
                <div> > <span
                        class="terminal-tab terminal-error">implement: {version.dataMapping.implement} ne donne rien</span>
                </div>
            {/if}
            {#if firstRow[version.dataMapping.control] !== undefined}
                <div> > <span
                        class="terminal-tab">control: {concatIfTooLong(firstRow[version.dataMapping.control])}</span>
                </div>
            {:else}
                <div> > <span
                        class="terminal-tab terminal-error">control: {version.dataMapping.control} ne donne rien</span>
                </div>
            {/if}
        {:else if state === State.BadMapping}
            <div class="terminal-error"> > Erreur de mapping des critères</div>
            <div> > Voici le résultat de la requête</div>
            {#each Object.keys(referentialData) as key}
                {#if typeof referentialData[key] !== 'string'}
                    <div> > <span class="terminal-tab">{key}: {typeof referentialData[key]}...</span></div>
                {:else}
                    <div> > <span class="terminal-tab">{key}: {referentialData[key]}...</span></div>
                {/if}
            {/each}
        {/if}
    </div>
</div>
<OutlinedButton type="button" color="primary" on:click={onTestApi}>Faire un test</OutlinedButton>

<style>
    .terminal {
        background-color: var(--background);
        border-radius: 15px;
        min-height: 50px;
        margin-top: 25px;
    }

    .terminal-content {
        color: var(--secondary);
        padding: 25px;
    }

    .terminal-error {
        color: var(--danger);
    }

    .terminal-tab {
        margin-left: 25px;
    }
</style>