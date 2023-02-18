<slot />

<style>
    :global(:root) {
        --dark: #06111B;
        --background-black: #191B20;
        --background: #16151a;
        --background-card: #212227;
        --primary: #8181DB;
        --secondary: #4bd2bc;
        --secondary2: #74dccb;
        --light: #215473;
        --text-light: #FFFFFF;
        --text-dark: #191B20;
        --danger: #F64C70;
        --warning: #f8d612;

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

    :global(body) {
        margin: 0;
        background-color: var(--background);
    }

    :global(.hr-gradient) {
        border: none;
        height: 3px;
        border-radius: 15px;
        background: var(--primary);
        background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 55%, var(--secondary2) 100%);
    }

    :global(.text-gradient) {
        background: linear-gradient(to right, var(--secondary) 0%, var(--secondary2) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    :global(.bg) {
        background-color: var(--background);
    }

    :global(.bg-card) {
        background-color: var(--background-card);
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

    :global(.space-between) {
        justify-content: space-between;
    }

    :global(.flex-wrap) {
        flex-wrap: wrap;
    }

    :global(.text-center) {
        text-align: center;
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

    :global(::-webkit-scrollbar-track) {
        background: var(--background);
    }

    :global(::-webkit-scrollbar-thumb) {
        background: var(--primary);
    }
</style>