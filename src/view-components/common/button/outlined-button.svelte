<script lang="ts">
	export let color: string;
	export let disabled = false;
	export let type = 'button';
</script>

<button class={color} {type} on:click disabled={disabled}>
	<slot />
</button>

<style>
	.primary {
		color: var(--primary);
		border: 1px solid var(--primary);
	}

	.secondary {
		color: var(--secondary);
		border: 1px solid var(--secondary);
	}

	.danger {
		color: var(--danger);
		border: 1px solid var(--danger);
	}

	.primary:hover {
		background-color: var(--primary);
		border: 1px solid var(--primary);
		color: var(--text-dark);
	}

	.secondary:hover {
		background-color: var(--secondary);
		border: 1px solid var(--secondary);
		color: var(--text-dark);
	}

	.danger:hover {
		background-color: var(--danger);
		border: 1px solid var(--danger);
		color: var(--text-dark);
	}

	.text-light {
		color: var(--text-light);
		border: 1px solid var(--text-light);
	}

	.text-light:hover {
		background-color: var(--text-light);
		border: 1px solid var(--text-light);
		color: var(--dark);
	}

	button {
		background-color: transparent;
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

	button:disabled,
	button[disabled] {
		color: rgba(255, 255, 255, 0.3)!important;
		border: 1px solid rgba(255, 255, 255, 0.12)!important;
		background-color: transparent!important;
		cursor: not-allowed;
	}
</style>
