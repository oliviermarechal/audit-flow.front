<script lang='ts'>
    import Nav from '../../libs/components/dashboard/nav.svelte';
    import {account, me} from '../../libs/store/account.store';
    import { goto } from '$app/navigation';

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

<main class='flex'>
    <Nav />
    <div class="main">
        <div class="container">
            <slot></slot>
        </div>
    </div>
</main>

<style>
    .main {
        width: 85%;
    }

    .container {
        margin: 30px;
    }
</style>