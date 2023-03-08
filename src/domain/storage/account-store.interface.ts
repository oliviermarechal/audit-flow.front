import type { Account } from '../models/referential';

export interface AccountStoreInterface {
	setAccount(account: Account): Promise<void>;
	setApiError(apiError: string): Promise<void>;
}
