import type { Account } from '../models';

export interface AccountStoreInterface {
	setAccount(account: Account): Promise<void>;
	setApiError(apiError: string): Promise<void>;
}
