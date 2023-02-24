<script lang="ts">
	export let open = false;
	export let onClose: () => unknown;
	export let size = 'lg';
	export let title: string;
</script>

<div class="modal {open ? '' : 'hide'}">
	<div class="modal-content {size}">
		<div class="modal-header">
			<span class="close" on:click={onClose}>&times;</span>
			{#if title}
				<h2 class="text-center">{title}</h2>
				<hr class="hr-gradient col-12 mb20" />
			{/if}
		</div>
		<slot />
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
		max-height: 60vh;
		overflow-x: hidden;
		overflow-y: auto;
		border: 1px solid var(--primary);
	}

	.lg {
		width: 80%;
	}

	.md {
		width: 60%;
	}

	.xs {
		width: 40%;
	}

	.close {
		color: #aaa;
		float: right;
		font-size: 28px;
		font-weight: bold;
	}

	.close:hover,
	.close:focus {
		color: black;
		text-decoration: none;
		cursor: pointer;
	}

	::-webkit-scrollbar {
		width: 10px;
	}

	::-webkit-scrollbar-track {
		background: var(--background);
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: var(--primary);
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: var(--primary);
	}
</style>
