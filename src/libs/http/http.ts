import {goto} from '$app/navigation';

export class Http {
    constructor(
        private readonly baseUrl: string,
        private readonly defaultRequest?: RequestInit,
    ) {}

    async onResponse(response: Response) {
        if (response.status === 401) {
            localStorage.removeItem('token');
            goto('/auth/login');
        }
    }

    async get(url: string, config?: RequestInit): Promise<Response> {
        const headers = config?.headers;
        delete config?.headers;

        const response = await fetch(
            this.baseUrl + url,
            {
                ...this.getDefaultConfig(),
                ...config,
                headers: {
                    ...this.getDefaultHeaders(),
                    ...headers,
                },
            }
        );

        await this.onResponse(response);

        return response;
    }

    async post(url: string, data: unknown, config?: RequestInit): Promise<Response> {
        const headers = config?.headers;

        if (headers) {
            delete config.headers;
        }

        const response = await fetch(
            this.baseUrl + url,
            {
                ...this.getDefaultConfig(),
                ...config,
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    ...this.getDefaultHeaders(),
                    ...headers,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        );

        await this.onResponse(response);

        return response;
    }

    async put(url: string, data: unknown, config?: RequestInit): Promise<Response> {
        const headers = config?.headers;

        if (headers) {
            delete config.headers;
        }

        const response = await fetch(
            this.baseUrl + url,
            {
                ...this.getDefaultConfig(),
                ...config,
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    ...this.getDefaultHeaders(),
                    ...headers,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        );

        await this.onResponse(response);

        return response;
    }

    getDefaultConfig(): RequestInit | undefined {
        const config = this.defaultRequest;

        delete config?.headers;

        return config;
    }

    getDefaultHeaders(): HeadersInit | undefined {
        const headers: HeadersInit | undefined = this.defaultRequest ? this.defaultRequest?.headers : {};
        if (localStorage.getItem('token')) {
            if (headers) {
                Object.assign(headers, {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                });
            }
        }

        return headers;
    }
}