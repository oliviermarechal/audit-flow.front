<script lang="ts">
    import OutlinedButton from '../button/outlined-button.svelte';

    export let open = false;
    export let cancel: (...args: unknown) => unknown;
    export let confirm: (...args: unknown) => unknown;
    export let title: string;

    export let confirmLabel = 'Confirmer';
    export let cancelLabel = 'Annuler';
    export let confirmColor = 'primary';
    export let cancelColor = 'danger';
</script>

<div class="modal {open ? '' : 'hide'}">
    <div class="modal-content">
        <div class="modal-header">
            {#if title}
                <h2 class="text-center">{title}</h2>
                <hr class="hr-gradient col-12 mb20" />
            {/if}
        </div>
        <div class="content"><slot /></div>
        <div class="modal-footer">
            <div class="mr-10">
                <OutlinedButton color={cancelColor} on:click={cancel}>
                    {cancelLabel ? cancelLabel : 'Annuler'}
                </OutlinedButton>
            </div>
            <OutlinedButton color={confirmColor} on:click={confirm}>
                {confirmLabel ? confirmLabel : 'Confirmer'}
            </OutlinedButton>
        </div>
    </div>
</div>

<style>
    .modal {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
    }

    .content {
        text-align: center;
        padding: 20px;
    }

    h2 {
        margin-top: 5px;
    }

    .modal-header {
        min-height: 30px;
    }

    .hide {
        display: none;
    }

    .modal-content {
        background-color: var(--background-card);
        margin: 15% auto;
        padding: 20px;
        max-height: 40vh;
        overflow-x: hidden;
        overflow-y: auto;
        border: 1px solid var(--primary);
        width: 40%;
    }

    .modal-footer {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }

    .mr-10 {
        margin-right: 10px;
    }
</style>
