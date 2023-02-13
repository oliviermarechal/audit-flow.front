export interface DataMappingInterface {
    referentialCriteria?: string;
    identifier?: string;
    label?: string;
    category?: string;
    description?: string;
    implement?: string;
    control?: string;
}

export class DataMapping implements DataMappingInterface {
    constructor(
        public referentialCriteria?: string,
        public identifier?: string,
        public label?: string,
        public category?: string,
        public description?: string,
        public implement?: string,
        public control?: string,
    ) {}

    public static fromPayload(data: DataMappingInterface) {
        return new DataMapping(
            data.referentialCriteria,
            data.identifier,
            data.label,
            data.category,
            data.description,
            data.implement,
            data.control,
        )
    }
}