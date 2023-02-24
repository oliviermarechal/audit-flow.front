import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Criteria } from '../../domain';
import type { CriteriaStoreInterface } from '../../domain/storage/criteria-store.interface';

export const criteria = writable<{ versionId: string; criteria: Criteria[] }[]>([]);
export const apiError = writable<string | null>();

class CriteriaStore implements CriteriaStoreInterface {
	constructor(
		private readonly criteriaWritable: Writable<{ versionId: string; criteria: Criteria[] }[]>,
		private readonly apiError: Writable<string | null>
	) {}

	async setCriteriaForVersion(versionId: string, newCriteria: Criteria[]) {
		this.criteriaWritable.update((criteria) => {
			if (criteria.length > 0) {
				return [
					...criteria.filter((c) => c.versionId !== versionId),
					{ versionId, criteria: newCriteria }
				];
			}

			return [{ versionId, criteria: newCriteria }];
		});
	}

	async removeCriteria(versionId: string, criteriaId: string) {
		this.criteriaWritable.update((criteria) => {
			const currentCriteria = criteria.find((c) => c.versionId === versionId);

			if (!currentCriteria) {
				return criteria;
			}

			return [
				...criteria.filter((c) => c.versionId !== versionId),
				{
					versionId,
					criteria: currentCriteria.criteria.filter((c) => c.id !== criteriaId)
				}
			];
		});
	}

	async addCriteriaForVersion(versionId: string, newCriteria: Criteria): Promise<void> {
		this.criteriaWritable.update((criteria) => {
			const currentVersion = criteria.find((c) => c.versionId === versionId);
			if (currentVersion) {
				return [
					...criteria.filter((c) => c.versionId !== versionId),
					{
						versionId: versionId,
						criteria: [...currentVersion.criteria, newCriteria]
					}
				];
			}

			return criteria;
		});
	}

	async updateCriteriaForVersion(versionId: string, updatedCriteria: Criteria): Promise<void> {
		this.criteriaWritable.update((criteria) => {
			const currentVersion = criteria.find((c) => c.versionId === versionId);
			if (currentVersion) {
				return [
					...criteria.filter((c) => c.versionId !== versionId),
					{
						versionId: versionId,
						criteria: [
							...currentVersion.criteria.filter((c) => c.id !== updatedCriteria.id),
							updatedCriteria
						]
					}
				];
			}

			return criteria;
		});
	}

	async removeCriteriaAndVersion(versionId: string): Promise<void> {
		this.criteriaWritable.update((criteria) => {
			return [
				...criteria.filter(c => c.versionId !== versionId),
			];
		})
	}

	async setApiError(apiError: string): Promise<void> {
		this.apiError.set(apiError);
		setTimeout(() => {
			this.apiError.set(null);
		}, 2000);
	}
}

export const criteriaStore = new CriteriaStore(criteria, apiError);
