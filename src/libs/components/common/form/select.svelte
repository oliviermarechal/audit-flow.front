<script lang="ts">
    export let color: string;
    export let label: string;
    export let key: string;
    export let fullWidth: boolean;
    export let element: unknown;
</script>

<div class="form-control">
    <label for="id-{key}">{label}</label>
    <select
        id="id-{key}"
        class="border-{color} {color} {fullWidth === true ? 'fullWidth' : ''}"
        {...$$restProps}
        on:blur
        on:focus
        bind:value={element}
    >
        <slot></slot>
    </select>
</div>

<style>
    select.fullWidth {
        width: 100%;
        box-sizing: border-box;
    }

    .text-light {
        color: var(--text-light);
    }

    .primary {
        color: var(--primary);
    }

    .form-control {
        margin-bottom: 1.5rem;
        background-color: transparent;
        width: 100%;
    }

    label {
        display: inline-block;
        width: 100%;
        font-size: 0.875rem;
        line-height: 1.4rem;
        vertical-align: top;
        margin-left: 5px;
    }

    select {
        font-weight: 400;
        font-size: 0.875rem;
        border-radius: 4px;
        height: 2.75rem;
        background-color: var(--background);
        display: block;
        padding: 0 20px;
        line-height: 1;
        background-clip: padding-box;
        appearance: none;
        outline: none;
    }

    .border-text-light {
        border: 1px solid transparent;
    }

    .border-text-light:focus {
        border: 1px solid var(--primary);
        outline: none;
    }

    .border-primary {
        border: 1px solid var(--primary);
    }
</style>