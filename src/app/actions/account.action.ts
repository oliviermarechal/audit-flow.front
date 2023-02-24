import type { Account } from '../../domain';
import { AccountStoreSingleton, HttpClientSingleton } from '../singleton';

export const login = async (email: string, password: string) => {
	const httpClient = HttpClientSingleton.getInstance();
	const accountStore = AccountStoreSingleton.getInstance();
	const response = await httpClient.post('/auth/login', { email, password });

	if (response.ok) {
		const data = await response.json();
		await accountStore.setAccount(data.account as Account);
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('token', data.token);
		}

		return true;
	}

	const errorResponse = await response.json();
	await accountStore.setApiError(errorResponse.message);

	return false;
};

export const registration = async (email: string, password: string) => {
	const httpClient = HttpClientSingleton.getInstance();
	const accountStore = AccountStoreSingleton.getInstance();
	const response = await httpClient.post('/auth/registration', { email, password });

	if (response.ok) {
		const data = await response.json();
		await accountStore.setAccount(data.account as Account);
		localStorage.setItem('token', data.token);

		return true;
	}

	const errorResponse = await response.json();
	await accountStore.setApiError(errorResponse.message);

	return false;
};

export const me = async () => {
	const httpClient = HttpClientSingleton.getInstance();
	const accountStore = AccountStoreSingleton.getInstance();
	const response = await httpClient.get('/auth/me');

	if (response.ok) {
		const data = await response.json();
		await accountStore.setAccount(data.account as Account);
	}
};
