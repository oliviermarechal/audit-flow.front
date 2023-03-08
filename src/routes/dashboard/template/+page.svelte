<script lang="ts">
    import OutlinedButton from '../../../view-components/common/button/outlined-button.svelte';
    import NewTemplateModal from '../../../view-components/template/new-template-modal.svelte';
    import {fetchTemplates} from '../../../app/actions/template.action';
    import {templates} from '../../../infra/store/template.store';

    $: $templates;
    if (!$templates?.length > 0) {
        fetchTemplates();
    }

    $: openNewTemplate = false;
</script>

<svelte:head>
    <title>Audit flow - Template</title>
</svelte:head>

<section class="template">
    <h1 class="text-gradient">Template</h1>
    <div class="block flex col-12">
        <div class="content-block">
            <p>Dans cette section vous pouvez créer et pré-configurer des templates sur mesure pour vos audits à partir de vos référentiels ou de référentiel public.</p>
            <div class="head-block-add col-12">
                <OutlinedButton on:click={() => openNewTemplate = true} color="secondary">Créer un template</OutlinedButton>
            </div>
        </div>
    </div>
    <div class="block flex col-12">
        <div class="content-block">
            <h2>Vos templates</h2>
            <hr class="hr-gradient col-12 mb20" />
            {#each $templates as template}
                <div class="template-row-container">
                    <a href={`/dashboard/template/${template.id}`}>
                        <span class="template-name">{template.name}</span>
                        <span>{template.version.referentialName} - version {template.version.version}</span>
                    </a>
                </div>
            {/each}
        </div>
    </div>
</section>
<NewTemplateModal open={openNewTemplate} onClose={() => openNewTemplate = false} />

<style>
    h1 {
        display: inline-block;
        font-size: 2em;
    }

    .block {
        background-color: var(--background-card);
        border-radius: 15px;
        margin: 5px;
    }

    .content-block {
        padding: 2rem 1.5rem;
        width: 100%;
    }

    .head-block-add {
        display: flex;
        justify-content: center;
    }

    section.template {
        margin: 0 15px;
    }

    .template-row-container {
        border-radius: 15px;
        background-color: var(--background);
        margin-bottom: 10px;
    }

    .template-row-container > a {
        border-radius: 15px;
        padding: 15px;
        background-color: var(--background);
        margin-bottom: 10px;
        width: 100%;
        display: block;
        box-sizing: border-box;
    }

    .template-name {
        font-size: 20px;
        display: block;
        color: var(--secondary);
    }

    .secondary-color {
        color: var(--secondary);
    }
</style>