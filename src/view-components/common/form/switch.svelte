<script lang="ts">
    export let element: unknown;
</script>

<label class="switch">
    <input
        type="checkbox"
        {...$$restProps}
        on:blur
        on:focus
        bind:checked={element}>
    <span class="slider round"></span>
</label>

<style>
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--background);
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: var(--primary);
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: var(--primary);
    }

    input:checked + .slider:before {
        background-color: var(--background);
    }

    input:focus + .slider {
        box-shadow: 0 0 1px var(--primary);
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    .round {
        border-radius: 34px;
    }

    .round:before {
        border-radius: 50%;
    }
</style>