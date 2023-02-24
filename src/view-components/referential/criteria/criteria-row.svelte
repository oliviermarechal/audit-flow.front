<script lang="ts">
	import { Icon } from 'svelte-awesome';
    import trashO from 'svelte-awesome/icons/trashO';
    import pencil from 'svelte-awesome/icons/pencil';
	import { Criteria, ReferentialVersionStatusEnum } from '../../../domain';
	import Modal from '../../common/modal.svelte';
	import Confirm from '../../common/confirm/confirm.svelte';
	import CriteriaForm from './criteria-form.svelte';
	import { removeCriteria, updateCriteria } from '../../../app/actions';

	export let criteria;
	export let version;
	let openEditModal = false;

	const onEdit = (criteria: Criteria) => {
		updateCriteria(version.id, criteria);
		openEditModal = false;
	};

	$: openConfirmationModal = false;

	const onConfirmRemove = () => {
		openConfirmationModal = false;
		removeCriteria(version.id, criteria.id);
	}
</script>

<td>{criteria.externalId}</td>
<td>{criteria.label}</td>
<td>{criteria.category ? criteria.category : 'Pas de catégorie'}</td>
{#if version.status !== ReferentialVersionStatusEnum.Published}
	<td class="action-td">
		<span class="icon-color-primary mr-10" on:click={() => (openEditModal = true)}><Icon data={pencil} label="Éditer le critère" scale="1.5" /></span>
		<span class="icon-color-danger" on:click={() => openConfirmationModal = true}><Icon data={trashO} label="Supprimer le critère" scale="1.5" /></span>
	</td>
{/if}

<Modal
	title={'Modifier un critère'}
	open={openEditModal}
	onClose={() => (openEditModal = false)}
	size="xs"
>
	<CriteriaForm
		onCancel={() => (openEditModal = false)}
		versionId={version.id}
		onSubmit={onEdit}
		{criteria}
		show={openEditModal}
	/>
</Modal>
<Confirm
	open={openConfirmationModal}
	confirm={() => onConfirmRemove()}
	cancel={() => openConfirmationModal = false}
	title="Confirmation suppression"
	cancelColor="primary"
	confirmColor="danger"
>
	Confirmez-vous la suppresion de ce critère ?
</Confirm>

<style>
    .icon-color-primary {
        color: var(--primary);
        cursor: pointer;
    }

    .icon-color-danger {
        color: var(--danger);
        cursor: pointer;
    }

	td {
		vertical-align: middle;
		text-align: center;
		line-height: 25px;
		height: 50px;
		padding: 0 10px;
	}

	.mr-10 {
		margin-right: 10px;
	}

	.action-td {
		white-space: nowrap;
	}
</style>
