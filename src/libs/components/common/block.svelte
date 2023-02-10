<script lang="ts">
    export let width = 'col-12';
    let marginClass = 'no-margin';

    if (width !== 'col-12') {
        marginClass = 'margin-auto';
    }

</script>

<div class="block {width} {marginClass}" {...$$restProps}>
    <slot></slot>
</div>

<style>
    .block {
        background-color: var(--background-card);
        padding: 1rem 1.5rem;
        border-radius: 15px;
        max-width: 95%;
    }

    .margin-auto {
        margin: 0 auto;
    }

    .no-margin {
        margin: 0;
    }
</style>