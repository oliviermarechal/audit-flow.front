import { Http } from './http';

export function getHttpClient(): Http {
	let apiUrl;
	if (process.env.NODE_ENV === 'development') {
		apiUrl = 'http://localhost:3000';
	}

	if (!apiUrl) {
		throw new Error('Production is not configurated');
	}

	return new Http(apiUrl);
}
