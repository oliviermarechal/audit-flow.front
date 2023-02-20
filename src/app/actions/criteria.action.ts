import {HttpClientSingleton} from '../singleton';
import {CriteriaStoreSingleton} from '../singleton/storage/criteria-store.singleton';
import {Criteria} from '../../domain';

export const listCriteriaForVersion = async (versionId: string) => {
    const httpClient = HttpClientSingleton.getInstance();
    const criteriaStore = CriteriaStoreSingleton.getInstance();

    const response = await httpClient.get(`/versions/${versionId}/criteria`);
    if (response.ok) {
        const data = await response.json();
        const criteriaCollection: Criteria[] = [];
        for (const criteria of data) {
            criteriaCollection.push(Criteria.fromPayload(criteria));
        }

        await criteriaStore.setCriteriaForVersion(versionId, criteriaCollection);
    }
}

export const fetchApiCriteriaForVersion = async (versionId: string): Promise<boolean> => {
    const httpClient = HttpClientSingleton.getInstance();
    const response = await httpClient.post(`/versions/${versionId}/fetch-criteria`, {});

    return response.ok;
}

export const createCriteria = async (versionId: string, criteria: Criteria) => {
    const httpClient = HttpClientSingleton.getInstance();
    const criteriaStore = CriteriaStoreSingleton.getInstance();
    const response = await httpClient.post(
        `/versions/${versionId}/criteria`,
        criteria.getPayload(),
    );

    const success = response.ok;
    const data = await response.json();
    if (success) {
        await criteriaStore.addCriteriaForVersion(versionId, Criteria.fromPayload(data));
    } else {
        await criteriaStore.setApiError(data);
    }
}

export const updateCriteria = async (versionId: string, criteria: Criteria) => {
    const httpClient = HttpClientSingleton.getInstance();
    const criteriaStore = CriteriaStoreSingleton.getInstance();
    const response = await httpClient.put(
        `/versions/${versionId}/criteria/${criteria.id}`,
        criteria.getPayload(),
    );

    const success = response.ok;
    const data = await response.json();
    if (success) {
        await criteriaStore.updateCriteriaForVersion(versionId, Criteria.fromPayload(data));
    } else {
        await criteriaStore.setApiError(data);
    }
}

export const removeCriteria = async (versionId: string, criteriaId: string) => {
    const httpClient = HttpClientSingleton.getInstance();
    const criteriaStore = CriteriaStoreSingleton.getInstance();
    const response = await httpClient.delete(
        `/versions/${versionId}/criteria/${criteriaId}`,
    );

    const success = response.ok;

    if (success) {
        await criteriaStore.removeCriteria(versionId, criteriaId);
    } else {
        const data = await response.json();
        await criteriaStore.setApiError(data);
    }
}