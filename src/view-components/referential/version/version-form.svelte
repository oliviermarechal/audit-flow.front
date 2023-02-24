<script lang="ts">
	import {DataMapping, ReferentialSyncModeEnum, ReferentialVersion} from '../../../domain';
	import VersionMapper from './version-mapper.svelte';
	import Input from '../../common/form/input.svelte';
	import Select from '../../common/form/select.svelte';
	import OutlinedButton from '../../common/button/outlined-button.svelte';

	export let referentialId: string;
	export let version: ReferentialVersion = ReferentialVersion.fromPayload({ referentialId, syncMode: ReferentialSyncModeEnum.MANUAL });
	export let showCancel = true;
	export let onCancel: () => unknown;
	export let handleSubmitForm: (version: ReferentialVersion) => unknown;

	let referentialData: unknown;
	let apiError: string | undefined;

	$: if (version.url) {
		try {
			const url = new URL(version.url);
			fetch(url)
				.then(async (response) => {
					referentialData = await response.json();
				})
				.catch((reason) => {
					referentialData = undefined;
					apiError = reason;
				});
		} catch (e) {
			referentialData = undefined;
			apiError = e.message;
		}
	}

	if (!version.dataMapping) {
		version.dataMapping = DataMapping.fromPayload({});
	}

	const getUniqueKey = (field: string) => {
		if (version?.id) {
			return `${field}_${version.id}`;
		}

		return field;
	};
</script>

<form on:submit|preventDefault={() => handleSubmitForm(version)} class="flex-column">
	<div>
		<Input
			fullWidth
			key={getUniqueKey('version')}
			label="Version"
			required
			color="text-light"
			type="text"
			bind:element={version.version}
		/>
	</div>
	{#if version.syncMode === ReferentialSyncModeEnum.API}
		<!-- Select sync mode hidden at the moment. Must be find a must generic system for map json data from api with criteria
		 		Or simply remove this and integrate one by one public referential with a SQL queries / custom formatter -->
		<Select
			key={getUniqueKey('sync-mode')}
			fullWidth
			label="Mode de récupération"
			color="text-light"
			bind:element={version.syncMode}
		>
			<option value={ReferentialSyncModeEnum.API}>API</option>
			<option value={ReferentialSyncModeEnum.MANUAL}>Manuel</option>
		</Select>

		<Input
			key={getUniqueKey('version-url')}
			fullWidth
			label="Url"
			color="text-light"
			type="text"
			bind:element={version.url}
		/>
		<VersionMapper {referentialData} {version} {apiError} />
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
