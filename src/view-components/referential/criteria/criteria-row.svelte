<script lang="ts">
    import {Icon} from 'svelte-awesome';
    import edit from 'svelte-awesome/icons/edit';
    import trash from 'svelte-awesome/icons/trash';
    import {Criteria} from '../../../domain';
    import Modal from '../../common/modal.svelte';
    import CriteriaForm from './criteria-form.svelte';
    import {removeCriteria, updateCriteria} from '../../../app/actions/criteria.action';

    export let criteria;
    export let versionId;
    let openEditModal = false;

    const onEdit = (criteria: Criteria) => {
        updateCriteria(versionId, criteria);
        openEditModal = false;
    }

    const onRemove = (id) => {
        removeCriteria(versionId, id);
    }
</script>

<tr>
    <td>{criteria.externalId}</td>
    <td>{criteria.label}</td>
    <td>{criteria.category}</td>
    <td>
        <span on:click={() => openEditModal = true}><Icon data={edit} scale="2" /></span>
        <span on:click={() => onRemove(criteria.id)}><Icon data={trash} scale="2" /></span>
    </td>
</tr>

<Modal title={'Modifier un critère'} open={openEditModal} onClose={() => openEditModal = false} size="xs">
    <CriteriaForm onCancel={() => openEditModal = false} versionId={versionId} onSubmit={onEdit} criteria={criteria} />
</Modal>