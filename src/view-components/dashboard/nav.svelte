<script lang="ts">
	import { account } from '../../infra/store/account.store';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '../common/button/outlined-button.svelte';

	const handleLogout = () => {
		account.set(null);
		if (typeof localStorage !== 'undefined') {
			localStorage.removeItem('token');
		}

		goto('/auth/login');
	};

	const isActive = (path: string) => {
		return $page.url.pathname.startsWith(path);
	};
</script>

<nav>
	<div class="nav-block">
		<div class="logo">
			<p class="text-gradient">Audit Flow</p>
		</div>
		<ul>
			{#if isActive('/dashboard/referential')}
				<li class="active"><a href="/dashboard/referential">Référentiel</a></li>
			{:else}
				<li>Référentiel</li>
			{/if}
			<li>Template</li>
			<li>Audit</li>
		</ul>
	</div>
	<div class="bottom">
		<Button color="primary" on:click={handleLogout}>Déconnexion</Button>
	</div>
</nav>

<style>
	nav {
		height: 100vh;
		width: 15%;
		color: var(--text-light);
		display: flex;
		position: fixed;
		flex-direction: column;
		justify-content: space-between;
		background-color: var(--background-card);
	}

	ul {
		padding: 5%;
	}

	li {
		display: flex;
		width: 100%;
		height: 40px;
		align-items: center;
		justify-content: center;
		color: var(--text-light);
		margin-top: 5px;
		border: 1px solid transparent;
	}

	li:hover,
	li.active {
		border: 1px solid var(--primary);
		color: var(--text-light);
		-webkit-border-radius: 50px;
		-moz-border-radius: 50px;
		border-radius: 50px;
	}

	.logo {
		padding: 10px;
		text-align: center;
		font-size: 24px;
	}

	.bottom {
		text-align: center;
		margin: 0 auto;
		margin-bottom: 10%;
	}
</style>
