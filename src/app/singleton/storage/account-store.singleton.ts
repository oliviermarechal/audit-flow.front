import { accountStore } from '../../../infra/store/account.store';
import type { AccountStoreInterface } from '../../../domain/storage';

export class AccountStoreSingleton {
	private static instance: AccountStoreInterface;

	constructor() {
		throw new Error('Use AccountStoreSingleton.getInstance() instead');
	}

	static getInstance(): AccountStoreInterface {
		if (!AccountStoreSingleton.instance) {
			AccountStoreSingleton.instance = accountStore;
		}

		return AccountStoreSingleton.instance;
	}
}
