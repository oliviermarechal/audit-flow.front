import type {ReferentialInterface} from '../../domain';
import {HttpClientSingleton, ReferentialStoreSingleton} from '../singleton';
import {Referential} from "../../domain";

export async function fetchReferentials(): Promise<void> {
    const httpClient = HttpClientSingleton.getInstance();
    const response = await httpClient.get('/referentials');
    const referentialStore = ReferentialStoreSingleton.getInstance();

    if (response.ok) {
        const referentials: ReferentialInterface[] = (await response.json() as ReferentialInterface[]);
        await referentialStore.setReferentials(referentials);
    }
}

export async function createReferential(referential: ReferentialInterface): Promise<Referential | void> {
    const httpClient = HttpClientSingleton.getInstance();
    const response = await httpClient.post(
        '/referentials',
        {...referential}
    );

    const referentialStore = ReferentialStoreSingleton.getInstance();
    const result = await response.json();
    const success = response.ok;
    if (success) {
        const referential = Referential.fromPayload(result);
        await referentialStore.addReferential(referential);

        return referential;
    } else {
        await referentialStore.setApiError(result as string);
    }
}
