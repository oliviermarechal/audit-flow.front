<script lang="ts">
	import { Criteria } from '../../../domain';
	import Input from '../../common/form/input.svelte';
	import Textarea from '../../common/form/textarea.svelte';
	import OutlinedButton from '../../common/button/outlined-button.svelte';

	export let versionId;
	export let show = true;
	export let criteria = Criteria.fromPayload({
		label: '',
		externalId: '',
		versionId
	});

	const onFormSubmit = () => {
		onSubmit(criteria);
		reset();
	}

	const reset = () => {
		criteria = Criteria.fromPayload({
			label: '',
			externalId: '',
			versionId
		});
	}

	export let onSubmit;
	export let onCancel;

	const getUniqueKey = (field: string) => {
		if (criteria) {
			return `${field}_${criteria.id}`;
		}

		return field;
	};
</script>

<form on:submit|preventDefault={() => onFormSubmit()} class="flex-column">
	<Input
		key={getUniqueKey("externalId")}
		fullWidth
		label="Numéro"
		required
		color="text-light"
		type="text"
		bind:element={criteria.externalId}
	/>
	<Textarea
		key={getUniqueKey("label")}
		fullWidth
		label="Label"
		required
		color="text-light"
		type="text"
		visible={show}
		bind:element={criteria.label}
	/>
	<Input
		key={getUniqueKey("category")}
		fullWidth
		label="Catégorie"
		color="text-light"
		type="text"
		bind:element={criteria.category}
	/>
	<Textarea
		key={getUniqueKey("description")}
		fullWidth
		label="Description"
		color="text-light"
		type="text"
		visible={show}
		bind:element={criteria.description}
	/>
	<div class="flex align-end">
		<div class="mr10">
			<OutlinedButton
				color="secondary"
				on:click={() => {
					reset()
					onCancel()
				}}
			>Annuler</OutlinedButton>
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
