<slot />

<style>
    :global(:root) {
        --dark: #06111B;
        --background-black: #191B20;
        --background: #16151a;
        --background-card: #212227;
        --primary: #b76dff;
        --secondary: #4bd2bc;
        --secondary2: #094242;
        --light: #215473;
        --text-light: #FFFFFF;
        --text-dark: #191B20;
        --danger: #F64C70;

        --bs-gray-100: #f8f9fa;
        --bs-gray-200: #e9ecef;
        --bs-gray-300: #dee2e6;
        --bs-gray-400: #ced4da;
        --bs-gray-500: #adb5bd;
        --bs-gray-600: #6c757d;
        --bs-gray-700: #495057;
        --bs-gray-800: #343a40;
        --bs-gray-900: #212529;

        color: var(--text-light);
    }

    :global(.hr-gradient) {
        border: none;
        height: 2px;
        background: rgb(183,109,255);
        background: linear-gradient(90deg, rgba(183,109,255,1) 0%, rgba(9,115,121,1) 45%, rgba(75,210,188,1) 100%);
    }

    :global(.text-gradient) {
        background: linear-gradient(to right, var(--primary) 32%, var(--secondary) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    :global(body) {
        margin: 0;
        background-color: var(--background);
    }

    :global(.flex) {
        display: flex;
        flex-wrap: wrap;
    }

    :global(.flex-column) {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    :global(.color-primary) {
        color: var(--primary);
    }

    :global(.color-secondary) {
        color: var(--secondary);
    }

    :global(.error) {
        color: var(--danger);
        font-weight: bold;
    }

    :global(
        a,
        a:active,
        a:hover,
        a:focus
    ) {
        color: inherit;
        text-decoration: none;
    }

    :global(ul) {
        list-style-type: none;
    }

    :global(.col-12) {
        flex: 0 0 auto;
        width: 100%
    }

    :global(.col-11) {
        flex: 0 0 auto;
        width: 91.67%
    }

    :global(.col-10) {
        flex: 0 0 auto;
        width: 83.3%
    }

    :global(.col-9) {
        flex: 0 0 auto;
        width: 75%
    }

    :global(.col-8) {
        flex: 0 0 auto;
        width: 66.67%
    }

    :global(.col-7) {
        flex: 0 0 auto;
        width: 58.33%
    }

    :global(.col-6) {
        flex: 0 0 auto;
        width: 50%
    }

    :global(.col-5) {
        flex: 0 0 auto;
        width: 41.67%
    }

    :global(.col-4) {
        flex: 0 0 auto;
        width: 33.33%
    }

    :global(.col-3) {
        flex: 0 0 auto;
        width: 25%
    }

    :global(.col-2) {
        flex: 0 0 auto;
        width: 16.67%
    }

    :global(.col-1) {
        flex: 0 0 auto;
        width: 8.33%;
    }
</style>