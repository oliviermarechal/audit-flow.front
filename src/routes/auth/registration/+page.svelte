<script lang="ts">
	import { goto } from '$app/navigation';
	import { apiError } from '../../../infra/store/account.store';
	import Input from '../../../view-components/common/form/input.svelte';
	import OutlinedButton from '../../../view-components/common/button/outlined-button.svelte';
	import Block from '../../../view-components/common/block.svelte';
	import { registration } from '../../../app/actions';

	let email;
	let password;

	const handleRegistration = async () => {
		if (!email || !password) {
			return;
		}

		const response = await registration(email, password);

		if (response) {
			return goto('/dashboard');
		}
	};
</script>

<main class="container">
	<div class="vertical-center">
		<Block width="col-6">
			<h1 class="title text-gradient">Inscription</h1>
			<form on:submit|preventDefault={handleRegistration} class="flex-column align-center">
				<Input
					fullWidth
					key="email"
					label="Email"
					color="text-light"
					name="email"
					bind:element={email}
				/>
				<Input
					fullWidth
					key="password"
					label="Mot de passe"
					color="text-light"
					name="password"
					type="password"
					bind:element={password}
				/>

				{#if $apiError}
					<span class="error">{$apiError}</span>
				{/if}
				<OutlinedButton color="primary" type="submit">Valider</OutlinedButton>
				<div class="mt-10">Déjà inscrit ? <a href="/auth/login">Connectez-vous</a></div>
			</form>
		</Block>
	</div>
</main>

<style>
	.container {
		margin: 0 auto;
		height: 100vh;
		max-width: 75%;
	}

	.align-center {
		align-items: center;
	}

	.vertical-center {
		position: relative;
		top: 20vh;
	}

	.title {
		text-align: center;
		margin-top: 0;
		padding-top: 15px;
	}

	.mt-10 {
		margin-top: 10px;
	}

	a,
	a:active,
	a:hover,
	a:focus {
		color: var(--primary);
		text-decoration: none;
	}

	.error {
		color: var(--danger);
		font-weight: bold;
		margin-bottom: 10px;
	}
</style>
