import { ReferentialVersion } from '../../domain';
import type { ReferentialVersionInterface } from '../../domain';
import { HttpClientSingleton, ReferentialStoreSingleton } from '../singleton';
import {CriteriaStoreSingleton} from '../singleton/storage/criteria-store.singleton';

export async function createVersion(referentialId: string, version: ReferentialVersion) {
	const httpClient = HttpClientSingleton.getInstance();
	const referentialStore = ReferentialStoreSingleton.getInstance();
	const response = await httpClient.post(
		`/referentials/${referentialId}/versions`,
		version.getPayload()
	);

	const jsonResult = await response.json();
	const data = response.ok ? ReferentialVersion.fromPayload(jsonResult) : (jsonResult as string);
	const responseData = {
		success: response.ok,
		data
	};

	if (responseData.success) {
		await referentialStore.addVersion(data as ReferentialVersion);
	}

	return responseData;
}

export async function updateVersion(referentialId: string, version: ReferentialVersion) {
	const httpCLient = HttpClientSingleton.getInstance();
	const referentialStore = ReferentialStoreSingleton.getInstance();
	const response = await httpCLient.put(
		`/referentials/${referentialId}/versions/${version.id}`,
		version.getPayload()
	);

	const jsonResult = await response.json();
	const data = response.ok ? ReferentialVersion.fromPayload(jsonResult) : (jsonResult as string);
	const responseData = {
		success: response.ok,
		data
	};

	if (responseData.success) {
		await referentialStore.updateVersion(referentialId, data as ReferentialVersion);
	}

	return responseData;
}

export async function removeVersion(referentialId: string, versionId: string): Promise<boolean | string> {
    const httpClient = HttpClientSingleton.getInstance();
    const referentialStore = ReferentialStoreSingleton.getInstance();
    const criteriaStore = CriteriaStoreSingleton.getInstance();

    const response = await httpClient.delete(`/referentials/${referentialId}/versions/${versionId}`);
    if (response.ok) {
        await referentialStore.removeVersion(referentialId, versionId);
        await criteriaStore.removeCriteriaAndVersion(versionId);

        return response.ok;
    } else {
        return response.json();
    }
}

export async function publishVersion(referentialId: string, versionId: string) {
	const httpClient = HttpClientSingleton.getInstance();
	const referentialStore = ReferentialStoreSingleton.getInstance();

	const response = await httpClient.post(
		`/referentials/${referentialId}/versions/${versionId}/publish`,
		{}
	);

	const data = await response.json();

	await referentialStore.updateVersion(
		referentialId,
		ReferentialVersion.fromPayload(data as ReferentialVersionInterface)
	);
}
