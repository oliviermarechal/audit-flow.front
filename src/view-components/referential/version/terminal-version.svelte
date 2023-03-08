<script lang="ts">
	import { ReferentialVersion } from '../../../domain/models/referential';

	export let version: ReferentialVersion;
	export let firstRow: unknown;

	const TerminalMaxLength = 100;
	const concatIfTooLong = (term: string) => {
		if (term.length > TerminalMaxLength) {
			term = term.substring(0, TerminalMaxLength);
			term += '(...)';
		}

		return term;
	};
</script>

<div class="col-12 terminal">
	<div class="terminal-content">
		<div>> Preview:</div>
		{#if firstRow[version.dataMapping.identifier] !== undefined}
			<div>
				>
				<span class="terminal-tab">
					identifiant: {concatIfTooLong(firstRow[version.dataMapping.identifier])}
				</span>
			</div>
		{:else}
			<div>
				>
				<span class="terminal-tab terminal-error">
					identifiant: {version.dataMapping.identifier || ''} ne donne rien
				</span>
			</div>
		{/if}
		{#if firstRow[version.dataMapping.label] !== undefined}
			<div>
				>
				<span class="terminal-tab">
					label: {concatIfTooLong(firstRow[version.dataMapping.label])}
				</span>
			</div>
		{:else}
			<div>
				>
				<span class="terminal-tab terminal-error">
					label: {version.dataMapping.label || ''} ne donne rien
				</span>
			</div>
		{/if}
		{#if firstRow[version.dataMapping.category] !== undefined}
			<div>
				>
				<span class="terminal-tab">
					<span class="col-2">Catégorie:</span>
					<span class="col-6">{concatIfTooLong(firstRow[version.dataMapping.category])}</span>
				</span>
			</div>
		{:else}
			<div>
				>
				<span class="terminal-tab terminal-error">
					Catégorie: {version.dataMapping.category || ''} ne donne rien
				</span>
			</div>
		{/if}
		{#if firstRow[version.dataMapping.description] !== undefined}
			<div>
				>
				<span class="terminal-tab">
					Description: {concatIfTooLong(firstRow[version.dataMapping.description])}
				</span>
			</div>
		{:else}
			<div>
				>
				<span class="terminal-tab terminal-error">
					Description: {version.dataMapping.description || ''} ne donne rien
				</span>
			</div>
		{/if}
	</div>
</div>

<style>
	.terminal {
		background-color: var(--background);
		border-radius: 15px;
		min-height: 50px;
		margin: 25px 0;
	}

	.terminal-content {
		color: var(--secondary);
		padding: 25px;
	}

	.terminal-error {
		color: var(--danger);
	}

	.terminal-warning {
		color: var(--warning);
	}

	.terminal-tab {
		margin-left: 25px;
	}
</style>
