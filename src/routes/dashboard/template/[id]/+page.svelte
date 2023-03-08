<script lang="ts">
    import OutlinedButton from '../../../../view-components/common/button/outlined-button.svelte';
    import Collapse from '../../../../view-components/common/collapse.svelte';
    import Modal from '../../../../view-components/common/modal.svelte';
    import Input from '../../../../view-components/common/form/input.svelte';
    import Select from '../../../../view-components/common/form/select.svelte';
    import {page} from '$app/stores';
    import {templates} from '../../../../infra/store/template.store';
    import {fetchTemplates} from '../../../../app/actions/template.action';
    import {criteria} from '../../../../infra/store/criteria.store';
    import {listCriteriaForVersion} from '../../../../app/actions';
    import {TemplateQuestion} from '../../../../domain/models/template';
    import {TemplateElement} from '../../../../domain/models/template/template-element';
    import { slide } from 'svelte/transition';
    import {flip} from 'svelte/animate';
    import {Criteria} from '../../../../domain';

    // INIT
    let templateId = $page.params.id;
    let template
    let sortedQuestions
    let versionCriteria

    $: if (templateId) {
        if (!$templates?.length > 0) {
            fetchTemplates();
        }

        template = $templates?.find(t => t.id === templateId);
        if (template && !$criteria.find(c => c.versionId === template.versionId)?.criteria) {
            listCriteriaForVersion(template.versionId);
        }
    }

    $: sortedQuestions = template?.getQuestionSorted();
    $: versionCriteria = $criteria?.find(c => c.versionId === template?.versionId)?.criteria;

    // New element
    $: openNewElement = false;

    let elementForm = TemplateElement.fromPayload({templateId: templateId, name: ''});
    const onCancelElementForm = () => {
        openNewElement = false;
        elementForm = TemplateElement.fromPayload({templateId: templateId, name: ''});
    }

    const onSubmitElement = () => {
        if (elementForm.name !== '') {
            template.elements = [
                ...template.elements,
                elementForm,
            ];

            openNewElement = false;
            elementForm = TemplateElement.fromPayload({templateId: templateId, name: ''});
        }
    }

    // Drag&drop
    const onDropInTemplate = (e, newOrdering?: number) => {
        e.preventDefault();
        const criteriaId = e.dataTransfer.getData('criteriaId');
        const draggedCriteria = versionCriteria.find(c => c.id === criteriaId);
        const fromOrdering = Number(e.dataTransfer.getData('ordering'));
        if (newOrdering && fromOrdering && newOrdering !== fromOrdering) {
            const questions = template.updateQuestionOrdering(newOrdering, fromOrdering);
            template.questions = [...questions];

            return;
        }

        if (fromOrdering && !newOrdering) {
            const questions = template.updateQuestionOrdering(template.questions.length, fromOrdering);

            template.questions = [...questions];
            return;
        }

        if (template.questions.find(q => q.criteriaId === criteriaId)) {
            return;
        }

        template.questions = [
            ...template.questions,
            TemplateQuestion.fromPayload({label: draggedCriteria.label, criteriaId, ordering: template.getNextQuestionNumber()})
        ];
    }

    const onDropInElement = (e, elementName: string, newOrdering?: number) => {
        e.preventDefault();
        const fromElementName = e.dataTransfer.getData('elementName');
        if (fromElementName && fromElementName !== elementName) {
            return; // Lock drag & drop between global <> element and different element <> element for now
        }

        const element = template.elements.find(element => element.name === elementName);
        const fromOrdering = Number(e.dataTransfer.getData('ordering'));
        if (newOrdering && fromOrdering && newOrdering !== fromOrdering) {
            const questions = element.updateQuestionOrdering(newOrdering, fromOrdering);
            element.questions = [...questions];

            return;
        }

        if (fromOrdering && !newOrdering) {
            const questions = element.updateQuestionOrdering(element.questions.length, fromOrdering);
            element.questions = [...questions];

            return;
        }

        const criteriaId = e.dataTransfer.getData('criteriaId');
        if (element.questions.find(q => q.criteriaId === criteriaId)) {
            return;
        }

        const draggedCriteria = versionCriteria.find(c => c.id === criteriaId);

        const positionNewQuestion = element.getNextQuestionNumber();
        element.questions = [
            ...element.questions,
            TemplateQuestion.fromPayload({label: draggedCriteria.label, criteriaId, ordering: positionNewQuestion}),
        ];

        if (newOrdering !== element.questions.length) {
            const questions = element.updateQuestionOrdering(newOrdering, positionNewQuestion);
            element.questions = [...questions];
        }

        template.elements = [
            ...template.elements.filter(element => element.name !== elementName),
            element,
        ];
    }

    const onDragStart = (e, ordering?: number) => {
        e.dataTransfer.dropEffect = 'move';
        e.dataTransfer.setData('criteriaId', e.target.getAttribute('id'));
        if (ordering) {
            e.dataTransfer.setData('ordering', ordering.toString());
        }
    }

    const onDragFromElement = (e, ordering: number, elementName: string) => {
        e.dataTransfer.dropEffect = 'move';
        e.dataTransfer.setData('elementName', elementName);
        e.dataTransfer.setData('criteriaId', e.target.getAttribute('id'));
        if (ordering) {
            e.dataTransfer.setData('ordering', ordering.toString());
        }
    }

    // Filter criteria list
    const getCriteria = (criteriaId: string) => {
        return versionCriteria.find(c => c.id === criteriaId);
    }

    let term;
    let category;
    $: filteredCriteria = [];
    $: if (versionCriteria) {
        let results: Criteria[] = versionCriteria;
        if (term?.length >= 3) {
            const regex = new RegExp(term, 'i')
            results = [
                ...results.filter(c => regex.test(c.label) || regex.test(c.externalId))
            ];
        }

        if (category) {
            results = [
                ...results.filter(c => c.category === category),
            ];
        }

        filteredCriteria = results;
    }

    let categories;

    $: if (versionCriteria) {
        categories = [...new Set(versionCriteria.map(c => c.category))];
    }
</script>

<svelte:head>
    <title>Audit flow - Template {template?.name}</title>
</svelte:head>

<div>
    {#if template}
        <h1 class="text-gradient">{template.name}</h1>
        <div class="flex flex-wrap col-12 overflow-auto vh85">
            <div class="col-12 block">
                <div class="block-content">
                    <p>
                        Pour créer votre template, vous pouvez glisser déposer les critères de la colonne de droite dans les zones prévue sur votre gauche<br />
                        Vous pouvez trouver la zone dite global qui contiendra les critères qui porteront sur l'ensemble de l'entité audité. <br />
                        Vous pouvez ensuite créer des élements pour pouvoir évaluer des collections d'entité "enfant". <br />
                        <small>Ex: dans le cas d'un audit d'accessibilité, certains critères évalue des éléments d'une page.
                            Vous aurez donc besoin de remplir plusieurs fois le même audit, un pour chacune des pages du site web (éléments) </small>
                    </p>
                </div>
            </div>
            <div class="col-6 block">
                <div class="block-content">
                    <h2 class="text-center">Déroulé</h2>
                    <hr class="hr-gradient col-12 mb20" />
                    <div>
                        {#if template.questions.length > 0}
                            <Collapse>
                                {#each sortedQuestions as question, index (question.ordering)}
                                    <div
                                        class="draggable item"
                                        draggable=true
                                        id={question.criteriaId}
                                        on:dragstart={(e) => onDragStart(e, question.ordering)}
                                        on:drop={(e) => onDropInTemplate(e, question.ordering)}
                                        ondragover="return false"
                                        transition:slide
                                        animate:flip
                                    >
                                        <span>{getCriteria(question.criteriaId).externalId} - {question.label} - {question.ordering}</span>
                                        <span class="category-tag">
                                            {#if getCriteria(question.criteriaId).category}
                                                {getCriteria(question.criteriaId).category}
                                            {:else}
                                                Défaut
                                            {/if}
                                        </span>
                                    </div>
                                {/each}
                            </Collapse>
                        {/if}
                    </div>
                    <div
                        class='drop-zone'
                        on:drop={onDropInTemplate}
                        ondragover="return false"
                    >Glissez un critère ici</div>
                </div>
                <div class="block-content mt-10">
                    <h2 class="text-center">Éléments</h2>
                    <hr class="hr-gradient col-12 mb20" />
                    {#if template.elements?.length === 0}
                        <div>
                            Aucun élément pour l'instant...
                        </div>
                    {/if}
                    {#each template.elements as element}
                        <div class="element-row">
                            {#if element.questions.length > 0}
                                <Collapse title={element.name}>
                                    {#each element.getQuestionSorted() as question, index (question.ordering)}
                                        <div
                                            on:drop={(e) => onDropInElement(e, element.name, question.ordering)}
                                            class="draggable item"
                                            draggable=true
                                            on:dragstart={(e) => onDragFromElement(e, element.name, question.ordering)}
                                            ondragover="return false"
                                            transition:slide
                                            animate:flip
                                        >
                                            <span>{getCriteria(question.criteriaId).externalId} - {question.label}</span>
                                            <span class="category-tag">
                                            {#if getCriteria(question.criteriaId).category}
                                                {getCriteria(question.criteriaId).category}
                                            {:else}
                                                Défaut
                                            {/if}
                                        </span>
                                        </div>
                                    {/each}
                                </Collapse>
                            {/if}
                            <div
                                class='drop-zone'
                                on:drop={(e) => onDropInElement(e, element.name)}
                                ondragover="return false"
                            >Ajouter un critère pour l'élement {element.name}
                            </div>
                        </div>
                    {/each}
                    <div class="mt10">
                        <OutlinedButton color="secondary" on:click={() => openNewElement = true}>AJouter un élément</OutlinedButton>
                    </div>
                </div>
            </div>
            <div class="col-6 block sticky">
                <div class="block-content">
                    <h2 class="text-center">Liste des critères</h2>
                    <hr class="hr-gradient col-12 mb20" />
                    <div class="col-12 flex flex-wrap">
                        <div class="col-6">
                            <Input
                                key="name"
                                fullWidth
                                label="Recherche"
                                required
                                color="text-light"
                                type="text"
                                bind:element={term}
                            />
                        </div>
                        <div class="col-6">
                            <Select
                                    key={'category'}
                                    fullWidth
                                    label={'Catégorie'}
                                    color="text-light"
                                    bind:element={category}
                            >
                                <option value=""></option>
                                {#each categories || [] as category}
                                    <option value={category}>{category}</option>
                                {/each}
                            </Select>
                        </div>
                    </div>
                    <div class="overflow-auto list-criteria">
                        {#each filteredCriteria || [] as criteria}
                            <div
                                class="draggable item"
                                draggable=true
                                on:dragstart={onDragStart}
                                id={criteria.id}
                            >
                                <span>{criteria.externalId} - {criteria.label}</span>
                                <span class="category-tag">
                                    {#if criteria.category}
                                        {criteria.category}
                                    {:else}
                                        Défaut
                                    {/if}
                                </span>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>
<Modal open={openNewElement} onClose={onCancelElementForm} title='Ajoutez un élément' size="xs">
    <form on:submit|preventDefault={() => onSubmitElement()} class="flex flex-wrap">
        <Input
            key="name"
            fullWidth
            label="Nom"
            required
            color="text-light"
            type="text"
            bind:element={elementForm.name}
        />
        <div class="col-12 flex align-end">
            <div class="mr10">
                <OutlinedButton
                    color="secondary"
                    on:click={onCancelElementForm}
                >Annuler</OutlinedButton>
            </div>
            <OutlinedButton color="primary" type="submit">Valider</OutlinedButton>
        </div>
    </form>
</Modal>

<style>
    .block {
        min-height: 15vh;
    }

    .block-content {
        padding: 1rem 1.5rem;
        border-radius: 15px;
        background-color: var(--background-card);
        margin: 5px;
    }

    .element-row {
        border: 1px solid var(--primary);
        padding: 15px;
        border-radius: 5px;
    }

    .draggable {
        cursor: move;
    }

    .item {
        position: relative;
        border: 1px solid transparent;
        margin: 10px;
        padding: 0.5rem 1.5rem;
        border-radius: 15px;
        background-color: var(--background);
    }

    .drop-zone {
        height: 60px;
        width: 100%;
        display: flex;
        flex-direction: column;
        text-align: center;
        color: var(--primary);
        border-radius: 10px;
        justify-content: center;
        border: 1px dashed var(--primary);
    }

    .mr10 {
        margin-right: 10px;
    }

    .align-end {
        justify-content: flex-end;
    }

    .category-tag {
        display: flex;
        flex-flow: row wrap;
        -webkit-box-pack: center;
        place-content: center;
        -webkit-box-align: center;
        align-items: center;
        position: absolute;
        box-sizing: border-box;
        font-family: Roboto, Helvetica, Arial, sans-serif;
        font-weight: 500;
        font-size: 0.75rem;
        min-width: 20px;
        padding: 0px 6px;
        height: 20px;
        border-radius: 5px;
        z-index: 1;
        transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        top: 0px;
        left: 0px;
        transform: scale(1) translate(10%, -50%);
        transform-origin: 0% 0%;
        background-color: var(--primary);
        border: 2px solid var(--background);
        color: var(--background);
    }

    .overflow-auto {
        overflow: auto;
    }

    .list-criteria {
        height: 60vh;
        overflow-y: scroll;
    }

    .sticky {
        position: -webkit-sticky; /* Safari */
        position: sticky;
        height: 85vh;
        top: 0;
    }

    .mt-10 {
        margin-top: 15px;
    }

    .vh85 {
        height: 85vh;
    }
</style>