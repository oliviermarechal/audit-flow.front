<script lang="ts">
    export let color: string;
    export let label: string;
    export let key: string;
    export let fullWidth: boolean;
    export let width = 'col-12';
    export let element: unknown;
</script>

<div class="form-control">
    <label for="id-{key}">{label}</label>
    <input
        id="id-{key}"
        class="border-{color} {color} {fullWidth === true ? 'fullWidth' : width}"
        {...$$restProps}
        on:blur
        on:focus
        bind:value={element}
    />
</div>

<style>
    input.fullWidth {
        width: 100%;
        box-sizing: border-box;
    }

    .text-light {
        color: var(--text-light);
    }

    .primary {
        color: var(--primary);
    }

    .secondary {
        color: var(--secondary);
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

    input:-webkit-autofill.text-light,
    input:-webkit-autofill:hover.text-light,
    input:-webkit-autofill:focus.text-light,
    input:-webkit-autofill:active.text-light {
        transition: background-color 5000s ease-in-out 0s;
        -webkit-text-fill-color: var(--text-light);
    }

    input:-webkit-autofill.primary,
    input:-webkit-autofill:hover.primary,
    input:-webkit-autofill:focus.primary,
    input:-webkit-autofill:active.primary {
        transition: background-color 5000s ease-in-out 0s;
        -webkit-text-fill-color: var(--primary);
    }

    input:-webkit-autofill.secondary,
    input:-webkit-autofill:hover.secondary,
    input:-webkit-autofill:focus.secondary,
    input:-webkit-autofill:active.secondary {
        transition: background-color 5000s ease-in-out 0s;
        -webkit-text-fill-color: var(--secondary);
    }

    input {
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

    .border-secondary {
        border: 1px solid var(--secondary);
    }
</style>