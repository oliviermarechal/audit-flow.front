<script lang="ts">
    import angleUp from 'svelte-awesome/icons/angleUp';
    import angleDown from 'svelte-awesome/icons/angleDown';
    import {Icon} from 'svelte-awesome';

    export let title: string | null = null;
    let hidden = false;
</script>

<div class="flex flex-wrap">
    <div class="head col-11">{title ? title : ''}</div>
    <div on:click={() => hidden = !hidden} class="col-1">
        {#if hidden}
            <span class="icon text-center"><Icon data={angleUp} scale="1.5" label="Cacher" /></span>
        {:else}
            <span class="icon text-center"><Icon data={angleDown} scale="1.5" label="Afficher" /></span>
        {/if}
    </div>
</div>
{#if !hidden}
<div>
    <slot></slot>
</div>
{/if}

<style>
    .head {
        text-align: center;
        font-size: 20px;
    }

    .icon {
        height: 30px;
        display: inline-block;
        width: 30px;
        border-radius: 50%;
        line-height: 40px;
        color: var(--primary);
    }

    .icon:hover {
        background-color: var(--background);
    }
</style>