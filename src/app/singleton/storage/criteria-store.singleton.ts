import type {CriteriaStoreInterface} from '../../../domain/storage/criteria-store.interface';
import {criteriaStore} from '../../../infra/store/criteria.store';

export class CriteriaStoreSingleton {
    private static instance: CriteriaStoreInterface;

    constructor() {
        throw new Error('Use CriteriaStoreSingleton.getInstance() instead');
    }

    static getInstance(): CriteriaStoreInterface {
        if (!CriteriaStoreSingleton.instance) {
            CriteriaStoreSingleton.instance = criteriaStore;
        }

        return CriteriaStoreSingleton.instance;
    }
}