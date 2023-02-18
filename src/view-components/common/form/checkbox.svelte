<script lang="ts">
    export let label: string;
    export let color: string;
    export let element: string;
    export let textHelper: string | null;
</script>

<div class="form-control">
    <label class="container">{label}
        <input
            type="checkbox"
            {...$$restProps}
            on:blur
            on:focus
            bind:checked={element}
        >
        <span class="checkmark {color}"></span>
        {#if textHelper}
            <div><small><i>{textHelper}</i></small></div>
        {/if}
    </label>
</div>

<style>
    .form-control {
        margin-bottom: 1.5rem;
        background-color: transparent;
        width: 100%;
    }

    .container {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        background-color: var(--background);
    }

    .container:hover input ~ .checkmark {
        background-color: var(--background);
    }

    .container input:checked ~ .checkmark.primary {
        background-color: var(--primary);
    }

    .container input:checked ~ .checkmark.secondary {
        background-color: var(--secondary);
    }

    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    .container input:checked ~ .checkmark:after {
        display: block;
    }

    .container .checkmark:after {
        left: 6px;
        top: 2px;
        width: 5px;
        height: 10px;
        border: solid var(--background);
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
</style>