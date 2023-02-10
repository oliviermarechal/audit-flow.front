import { writable } from 'svelte/store';
import type {ReferentialInterface} from '../../domain/models';
import {getHttpClient} from '../../config/config';

export const referentials = writable<ReferentialInterface[]>([]);
export const apiError = writable<string | undefined>();
export const FetchReferentials = async () => {
    const response = await getHttpClient().get('/referentials');
    if (response.ok) {
        referentials.set((await response.json()) as ReferentialInterface[]);
    }
}

export const CreateReferential = async (referential: ReferentialInterface) => {
    const response = await getHttpClient().post(
        '/referentials',
        {...referential}
    );

    if (response.ok) {
        const data = await response.json() satisfies ReferentialInterface;
        referentials.update((referentials) => {
            referentials.push(data)
            return referentials;
        });
    } else {
        // TODO Manage error message by fields
        apiError.set(await response.json());
    }
}