export interface TemplateQuestionInterface {
    label: string;
    criteriaId: string;
    ordering: number;
    templateId?: string;
    elementId?: string;
    answersAvailable?: never[];
}

export class TemplateQuestion implements TemplateQuestionInterface {
    constructor(
        public label: string,
        public criteriaId: string,
        public ordering: number,
        public templateId?: string,
        public elementId?: string,
        public answersAvailable?: never[],
    ) {}

    static fromPayload(props: TemplateQuestionInterface) {
        return new TemplateQuestion(
            props.label,
            props.criteriaId,
            props.ordering,
            props.templateId,
            props.elementId,
            props.answersAvailable,
        )
    }
}