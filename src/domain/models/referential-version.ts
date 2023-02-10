export enum ReferentialSyncModeEnum {
    MANUAL = 'MANUAL',
    API = 'API',
}

export interface ReferentialVersion {
    id?: string;
    url?: string;
    version: string;
    updatedAt?: Date;
    syncMode: ReferentialSyncModeEnum;
    versionInUrl?: boolean;
    dataMapping?: any; // TPODO Add ReferentialDataMapping model;
    referentialId: string;
}