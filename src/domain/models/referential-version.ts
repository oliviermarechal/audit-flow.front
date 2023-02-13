import {DataMapping} from './data-mapping';
import type {DataMappingInterface} from './data-mapping';

export enum ReferentialSyncModeEnum {
    MANUAL = 'MANUAL',
    API = 'API',
}

export interface ReferentialVersionInterface {
    id?: string;
    url?: string;
    version?: string;
    updatedAt?: Date;
    syncMode?: ReferentialSyncModeEnum;
    versionInUrl?: boolean;
    dataMapping?: DataMappingInterface;
    referentialId: string;
}

export class ReferentialVersion implements ReferentialVersionInterface {
    constructor(
        public referentialId: string,
        public id?: string,
        public url?: string,
        public version?: string,
        public updatedAt?: Date,
        public syncMode?: ReferentialSyncModeEnum,
        public versionInUrl?: boolean,
        public dataMapping?: DataMappingInterface,
    ) {}

    public static fromPayload(data: ReferentialVersionInterface) {
        return new ReferentialVersion(
            data.referentialId,
            data.id,
            data.url,
            data.version,
            data.updatedAt,
            data.syncMode,
            data.versionInUrl,
            DataMapping.fromPayload(data.dataMapping || {}),
        )
    }
}