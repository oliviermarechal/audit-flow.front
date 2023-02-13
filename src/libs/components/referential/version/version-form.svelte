<script lang="ts">
    import {ReferentialSyncModeEnum} from '../../../../domain/models';
    import {ReferentialVersion} from '../../../../domain/models/referential-version';
    import Input from '../../common/form/input.svelte';
    import Checkbox from '../../common/form/checkbox.svelte';
    import Select from '../../common/form/select.svelte';
    import OutlinedButton from '../../common/button/outlined-button.svelte';
    import {DataMapping} from '../../../../domain/models/data-mapping';
    import TerminalVersion from '../version/terminal-version.svelte';

    export let referentialId: string;
    export let version: ReferentialVersion = ReferentialVersion.fromPayload({referentialId});
    export let showCancel = true;
    export let onCancel: () => unknown;
    const handleSubmitForm = () => {
        console.log('SUBMIT');
    }

    if (!version.dataMapping) {
        version.dataMapping = DataMapping.fromPayload({});
    }

    const getUniqueKey = (field: string) => {
        if (version?.id) {
            return `${field}_${version.id}`;
        }

        return field;
    }
</script>

<form on:submit|preventDefault={handleSubmitForm} class="flex-column">
    <Input key="{getUniqueKey('version')}" fullWidth label="Version" required color="text-light" type="text"
           bind:element={version.version}/>
    <Select key="{getUniqueKey('sync-mode')}" fullWidth label="Mode de récupération" color="text-light"
            bind:element={version.syncMode}>
        <option value={ReferentialSyncModeEnum.API}>API</option>
        <option value={ReferentialSyncModeEnum.MANUAL}>Manuel</option>
    </Select>
    {#if version.syncMode === ReferentialSyncModeEnum.API}
        <Input key="{getUniqueKey('version-url')}" fullWidth label="Url" color="text-light" type="text"
               bind:element={version.url}/>
        <Checkbox
                key="{getUniqueKey('versionInUrl')}"
                fullWidth
                label="version dans l'url"
                color="text-light"
                type="text"
                bind:element={version.versionInUrl}
                textHelper="Exemple: http://referentiel-domain.com/version/{'{'}version{'}'}/..."
        />
        <h3>Mapping des données de l'API</h3>
        <hr class="hr-gradient col-12 mb20" />
        <div class="flex flex-wrap col-12">
            <div class="col-3">
                <Input key="{getUniqueKey('referentialCriteria')}" fullWidth label="Champ contenant la liste des critères"
                       color="text-light" type="text"
                       bind:element={version.dataMapping.referentialCriteria}/>
            </div>
            <div class="col-3">
                <Input key="{getUniqueKey('identifier')}" fullWidth label="Identifiant du critère"
                       color="text-light" type="text"
                       bind:element={version.dataMapping.identifier}/>
            </div>
            <div class="col-3">
                <Input key="{getUniqueKey('label')}" fullWidth label="Label du critère" color="text-light"
                       type="text"
                       bind:element={version.dataMapping.label}/>
            </div>
            <div class="col-3">
                <Input key="{getUniqueKey('category')}" fullWidth label="Catégorie du critère" color="text-light"
                       type="text"
                       bind:element={version.dataMapping.category}/>
            </div>
            <div class="col-3">
                <Input key="{getUniqueKey('description')}" fullWidth label="Description du critère"
                       color="text-light" type="text"
                       bind:element={version.dataMapping.description}/>
            </div>
            <div class="col-3">
                <Input key="{getUniqueKey('implement')}" fullWidth label="Comment implémenter ce critère"
                       color="text-light" type="text"
                       bind:element={version.dataMapping.implement}/>
            </div>
            <div class="col-3">
                <Input key="{getUniqueKey('control')}" fullWidth label="Comment contrôler ce critère"
                       color="text-light" type="text"
                       bind:element={version.dataMapping.control}/>
            </div>
            <TerminalVersion version={version} />
        </div>
    {/if}
    <div class="flex align-end">
        {#if showCancel}
            <div class="mr10">
                <OutlinedButton color="secondary" on:click={onCancel}>Annuler</OutlinedButton>
            </div>
        {/if}
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