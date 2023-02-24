import { getHttpClient } from '../../infra/http/http-client';
import type { HttpClientInterface } from '../../domain';

export class HttpClientSingleton {
	private static instance: HttpClientInterface;
	constructor() {
		throw new Error('Use HttpClientSingleton.getInstance() instead');
	}

	static getInstance(): HttpClientInterface {
		if (!HttpClientSingleton.instance) {
			HttpClientSingleton.instance = getHttpClient();
		}

		return HttpClientSingleton.instance;
	}
}
