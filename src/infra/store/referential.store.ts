import type {Writable} from 'svelte/store';
import {writable} from 'svelte/store';
import type {ReferentialInterface, ReferentialStoreInterface, ReferentialVersionInterface} from '../../domain';

export const referentials = writable<ReferentialInterface[]>([]);
export const apiError = writable<string | undefined>();

class ReferentialStore implements ReferentialStoreInterface {
    constructor(
        private readonly referentialWritable: Writable<ReferentialInterface[]>,
        private readonly referentialApiError: Writable<string | undefined>,
    ) {}

    async setReferentials(referentials: ReferentialInterface[]) {
        await this.referentialWritable.set(referentials);
    }

    async updateReferential(referential: ReferentialInterface): Promise<void> {
        await this.referentialWritable.update(referentials => {
            return [
                ...referentials.filter(r => r.id !== referential.id),
                referential,
            ]
        })
    }

    async addReferential(referential: ReferentialInterface) {
        await this.referentialWritable.update((referentials) => {
            referentials.push(referential)
            return referentials;
        });
    }

    async addVersion(version: ReferentialVersionInterface): Promise<void> {
        this.referentialWritable.update((referentials) => {
            for (const referential of referentials) {
                if (referential.id === version.referentialId) {
                    if (referential.versions) {
                        referential.versions.push(version);
                    } else {
                        referential.versions = [version]
                    }
                }
            }

            return referentials;
        })
    }

    async updateVersion(referentialId: string, version: ReferentialVersionInterface): Promise<void> {
        this.referentialWritable.update((referentials) => {
            for (const referential of referentials) {
                if (referential.id === referentialId) {
                    if (referential.versions) {
                        referential.versions = [
                            ...referential.versions.filter(v => v.id !== version.id),
                            version,
                        ]
                    } else {
                        referential.versions = [version]
                    }
                }
            }

            return referentials;
        })
    }

    async setApiError(apiError: string) {
        this.referentialApiError.set(apiError);
    }
}

export const referentialStore = new ReferentialStore(referentials, apiError);