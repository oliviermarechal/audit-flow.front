import type { ReferentialInterface, ReferentialVersionInterface } from '../models/referential';

export interface ReferentialStoreInterface {
	setReferentials(referentials: ReferentialInterface[]): Promise<void>;
	addReferential(referential: ReferentialInterface): Promise<void>;
	updateReferential(referential: ReferentialInterface): Promise<void>;
	addVersion(version: ReferentialVersionInterface): Promise<void>;
    removeVersion(referentialId: string, versionId: string): Promise<void>;
	updateVersion(referentialId: string, version: ReferentialVersionInterface): Promise<void>;
	setApiError(apiError: string): Promise<void>;
}
