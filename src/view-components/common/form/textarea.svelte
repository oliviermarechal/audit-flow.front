<script lang="ts">
	import {afterUpdate, onMount} from 'svelte';

	export let color: string;
	export let label: string;
	export let key: string;
	export let fullWidth: boolean;
	export let width: string | undefined = undefined;
	export let visible = true;
	export let element: unknown;

	let textareaEl;

	$: if (visible && textareaEl) {
		textareaEl.style.height = textareaEl.scrollHeight > 0 ? (textareaEl.scrollHeight + 5) + 'px' : '40px';
	}

	onMount(() => {
		textareaEl.style.height = textareaEl.scrollHeight > 0 ? (textareaEl.scrollHeight + 5) + 'px' : '40px';
	})

	afterUpdate(() => {
		textareaEl.style.height = textareaEl.scrollHeight > 0 ? (textareaEl.scrollHeight + 5) + 'px' : '40px';
	})

</script>

<div class="form-control">
	<label for="id-{key}">{label}</label>
	<textarea
		id="id-{key}"
		class="border-{color} {color} {fullWidth === true ? 'fullWidth' : width}"
		{...$$restProps}
		on:blur
		on:focus
		bind:value={element}
		bind:this={textareaEl}
	></textarea>
</div>

<style>
	textarea.fullWidth {
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

	textarea:-webkit-autofill.text-light,
	textarea:-webkit-autofill:hover.text-light,
	textarea:-webkit-autofill:focus.text-light,
	textarea:-webkit-autofill:active.text-light {
		transition: background-color 5000s ease-in-out 0s;
		-webkit-text-fill-color: var(--text-light);
	}

	textarea:-webkit-autofill.primary,
	textarea:-webkit-autofill:hover.primary,
	textarea:-webkit-autofill:focus.primary,
	textarea:-webkit-autofill:active.primary {
		transition: background-color 5000s ease-in-out 0s;
		-webkit-text-fill-color: var(--primary);
	}

	textarea:-webkit-autofill.secondary,
	textarea:-webkit-autofill:hover.secondary,
	textarea:-webkit-autofill:focus.secondary,
	textarea:-webkit-autofill:active.secondary {
		transition: background-color 5000s ease-in-out 0s;
		-webkit-text-fill-color: var(--secondary);
	}

	textarea {
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
