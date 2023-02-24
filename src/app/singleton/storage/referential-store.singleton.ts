import type { ReferentialStoreInterface } from '../../../domain';
import { referentialStore } from '../../../infra/store/referential.store';

export class ReferentialStoreSingleton {
	private static instance: ReferentialStoreInterface;

	constructor() {
		throw new Error('Use ReferentialStoreSingleton.getInstance() instead');
	}

	static getInstance(): ReferentialStoreInterface {
		if (!ReferentialStoreSingleton.instance) {
			ReferentialStoreSingleton.instance = referentialStore;
		}

		return ReferentialStoreSingleton.instance;
	}
}
