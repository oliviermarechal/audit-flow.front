import type { Criteria } from '../models/referential';

export interface CriteriaStoreInterface {
	setCriteriaForVersion(versionId: string, newCriteria: Criteria[]): Promise<void>;
	addCriteriaForVersion(versionId: string, newCriteria: Criteria): Promise<void>;
	updateCriteriaForVersion(versionId: string, updatedCriteria: Criteria): Promise<void>;
	removeCriteria(versionId: string, criteriaId: string): Promise<void>;
    removeCriteriaAndVersion(versionId: string): Promise<void>;
	setApiError(apiError: string): Promise<void>;
}
