<script lang="ts">
	import Nav from '../../view-components/dashboard/nav.svelte';
	import { account } from '../../infra/store/account.store';
	import { goto } from '$app/navigation';
	import { me } from '../../app/actions';

	if (!$account) {
		if (typeof localStorage !== 'undefined') {
			const token = localStorage.getItem('token');
			if (token) {
				me();
			} else {
				goto('/auth/login');
			}
		}
	}
</script>

<main class="flex">
	<Nav />
	<div class="main">
		<div class="container">
			<slot />
		</div>
	</div>
</main>

<style>
	.main {
		width: 85%;
		margin-left: 15%;
		overflow: auto;
	}

	.container {
		margin: 30px;
	}
</style>
