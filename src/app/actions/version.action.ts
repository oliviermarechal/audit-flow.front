import {ReferentialVersion} from '../../domain';
import type {ReferentialVersionInterface} from '../../domain';
import {HttpClientSingleton, ReferentialStoreSingleton} from '../singleton';

export async function createVersion(referentialId: string, version: ReferentialVersion) {
    const httpClient = HttpClientSingleton.getInstance();
    const referentialStore = ReferentialStoreSingleton.getInstance();
    const response = await httpClient.post(
        `/referentials/${referentialId}/versions`,
        version.getPayload(),
    );

    const jsonResult = await response.json();
    const data = response.ok ? ReferentialVersion.fromPayload(jsonResult) : jsonResult as string
    const responseData = {
        success: response.ok,
        data,
    }

    if (responseData.success) {
        await referentialStore.addVersion(data as ReferentialVersion);
    }

    return responseData;
}

export async function publishVersion(referentialId: string, versionId: string) {
    const httpClient = HttpClientSingleton.getInstance();
    const referentialStore = ReferentialStoreSingleton.getInstance();

    const response = await httpClient.post(
        `/referentials/${referentialId}/versions/${versionId}/publish`,
        {}
    );

    const data = await response.json();

    await referentialStore.updateVersion(referentialId, ReferentialVersion.fromPayload(data as ReferentialVersionInterface));
}
