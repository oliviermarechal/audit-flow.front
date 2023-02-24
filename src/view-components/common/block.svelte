<script lang="ts">
	export let width = 'col-12';
	let margin = 'no-margin';

	if (width !== 'col-12') {
		margin = 'margin-auto';
	}
</script>

<div class="{width} {margin}" {...$$restProps}>
	<div class="block">
		<slot />
	</div>
</div>

<style>
	.block {
		background-color: var(--background-card);
		padding: 1rem 1.5rem;
		margin: 5px;
		border-radius: 15px;
	}

	.margin-auto {
		margin: 0 auto;
	}

	.no-margin {
		margin: 0;
	}
</style>
