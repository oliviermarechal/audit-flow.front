export interface CriteriaInterface {
    id?: string;
    label: string;
    externalId: string;
    category?: string;
    description?: string;
    versionId: string;
}

export class Criteria implements CriteriaInterface {
    constructor(
        public versionId: string,
        public label: string,
        public externalId: string,
        public category?: string,
        public description?: string,
        public id?: string,
    ) {}

    public static fromPayload(data: CriteriaInterface) {
        return new Criteria(
            data.versionId,
            data.label,
            data.externalId,
            data.category,
            data.description,
            data.id,
        )
    }

    public getPayload() {
        return {
            label: this.label,
            externalId: this.externalId,
            category: this.category,
            description: this.description,
        }
    }
}