import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Account } from '../../domain';
import type { AccountStoreInterface } from '../../domain/storage';

export const account = writable<Account | null>();
export const apiError = writable<string | null>();

class AccountStore implements AccountStoreInterface {
	constructor(
		private readonly accountWritable: Writable<Account | null>,
		private readonly apiError: Writable<string | null>
	) {}
	async setAccount(account: Account): Promise<void> {
		this.accountWritable.set(account);
	}

	async setApiError(apiError: string): Promise<void> {
		this.apiError.set(apiError);
		setTimeout(() => {
			this.apiError.set(null);
		}, 2000);
	}
}

export const accountStore = new AccountStore(account, apiError);
