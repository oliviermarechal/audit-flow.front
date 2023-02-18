<script lang="ts">
    import { goto } from '$app/navigation';
    import { apiError } from '../../../infra/store/account.store';
    import Input from '../../../view-components/common/form/input.svelte';
    import Button from '../../../view-components/common/button/outlined-button.svelte';
    import Block from '../../../view-components/common/block.svelte';
    import {login} from '../../../app/actions';

    let email;
    let password;

    if (typeof localStorage !== 'undefined') {
        if (localStorage.getItem('token')) {
            goto('/dashboard');
        }
    }

    const authenticate = async () => {
        if (!email || !password) {
            return;
        }

        const valid = await login(email, password);

        if (valid) {
            return goto('/dashboard');
        }
    }
</script>

<svelte:head>
    <title>Audit flow - Connexion</title>
</svelte:head>

<main class="container">
    <div class="vertical-center">
        <Block width="col-6">
            <h1 class="title text-gradient">Connexion</h1>
            <form on:submit|preventDefault={authenticate} class="flex-column align-center">
                <Input color="text-light" fullWidth label="Email" key="email" name="email" bind:element={email} />
                <Input color="text-light" fullWidth label="Mot de passe" key="password" name="password" type="password" bind:element={password} />

                {#if $apiError}
                    <span class="error">{$apiError}</span>
                {/if}
                <Button color="primary" type="submit">Valider</Button>
                <div class="mt-10">Pas encore inscrit ? N'hésite pas <a href="/auth/registration">Inscription</a></div>
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

    .error {
        color: var(--danger);
        font-weight: bold;
    }

    a,
    a:active,
    a:hover,
    a:focus {
        color: var(--primary);
        text-decoration: none;
    }
</style>