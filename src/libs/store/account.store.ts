import { writable } from 'svelte/store';
import type {Account} from '../../domain/models';
import {getHttpClient} from '../../config/config';

const httpClient = getHttpClient();

export const account = writable<Account | null>();
export const apiError = writable<string | null>();

export const login = async (email: string, password: string) => {
    const response = await httpClient.post('/auth/login', {email, password});

    if (response.ok) {
        const data = await response.json();
        account.set(data.account as Account);
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('token', data.token);
        }

        return true;
    }

    const errorResponse = await response.json();
    setError(errorResponse.message);

    return false;
}

export const registration = async (email: string, password: string) => {
    const response = await httpClient.post('/auth/registration', {email, password});

    if (response.ok) {
        const data = await response.json();
        account.set(data.account as Account);
        localStorage.setItem('token', data.token);

        return true;
    }

    const errorResponse = await response.json();
    setError(errorResponse.message);

    return false;
}

export const me = async () => {
    const response = await httpClient.get('/auth/me');

    if (response.ok) {
        const data = await response.json();
        account.set(data as Account);
    }
}


const setError = (error: string) => {
    apiError.set(error);
    setTimeout(() => {
        apiError.set(null);
    }, 2000);
}
