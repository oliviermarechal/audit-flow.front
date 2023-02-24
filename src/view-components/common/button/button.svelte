<script lang="ts">
	export let color: 'primary' | 'secondary' | 'danger';
</script>

<button class={color} on:click>
	<slot />
</button>

<style>
	.primary {
		background-color: var(--primary);
		border: 1px solid var(--primary);
		color: var(--background);
	}

	.secondary {
		background-color: var(--secondary);
		border: 1px solid var(--secondary);
		color: var(--text-light);
	}

	.danger {
		background-color: var(--danger);
		border: 1px solid var(--danger);
		color: var(--text-light);
	}

	.text-light {
		background-color: var(--text-light);
		border: 1px solid var(--text-light);
		color: var(--dark);
	}

	.text-light {
		background-color: var(--text-light);
		border: 1px solid var(--text-light);
		color: var(--dark);
	}

	button {
		display: inline-block;
		text-align: center;
		text-decoration: none;
		vertical-align: middle;
		cursor: pointer;
		user-select: none;
		padding: 0.875rem 1.5rem;
		font-size: 0.875rem;
		border-radius: 0.1875rem;
	}
</style>
