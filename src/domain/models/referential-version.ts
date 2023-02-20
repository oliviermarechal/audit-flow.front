import {DataMapping} from './data-mapping';
import type {DataMappingInterface} from './data-mapping';

export enum ReferentialSyncModeEnum {
    MANUAL = 'MANUAL',
    API = 'API',
}

export enum ReferentialVersionStatusEnum {
    Draft = 'Draft',
    Published = 'Published',
    Archived = 'Archived',
}

export interface ReferentialVersionInterface {
    id?: string;
    url?: string;
    version?: string;
    updatedAt?: string;
    createdAt?: string;
    status?: ReferentialVersionStatusEnum;
    syncMode?: ReferentialSyncModeEnum;
    dataMapping?: DataMappingInterface;
    referentialId: string;
}

export class ReferentialVersion implements ReferentialVersionInterface {
    constructor(
        public referentialId: string,
        public id?: string,
        public url?: string,
        public version?: string,
        public status?: ReferentialVersionStatusEnum,
        public createdAt?: string,
        public updatedAt?: string,
        public syncMode?: ReferentialSyncModeEnum,
        public dataMapping?: DataMappingInterface,
    ) {}

    public static fromPayload(data: ReferentialVersionInterface) {
        return new ReferentialVersion(
            data.referentialId,
            data.id,
            data.url,
            data.version,
            data.status,
            data.createdAt,
            data.updatedAt,
            data.syncMode,
            DataMapping.fromPayload(data.dataMapping || {}),
        )
    }

    public getPayload() {
        return {
            url: this.url,
            version: this.version,
            syncMode: this.syncMode,
            dataMapping: this.syncMode === ReferentialSyncModeEnum.API ?
                {
                    referentialCriteria: this.dataMapping?.referentialCriteria,
                    identifier: this.dataMapping?.identifier,
                    label: this.dataMapping?.label,
                    category: this.dataMapping?.category,
                    description: this.dataMapping?.description,
                } :
                null,
        }
    }
}