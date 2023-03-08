import type {TemplateQuestionInterface} from './template-question';
import type {TemplateElementInterface} from './template-element';
import {TemplateQuestion} from './template-question';
import {TemplateElement} from './template-element';

export interface TemplateInterface {
    id?: string;
    name: string;
    versionId: string;
    version?: {
        id: string;
        version: string;
        referentialName: string;
    }
    ownerId?: string;
    elements?: TemplateElementInterface[];
    questions?: TemplateQuestionInterface[];
}

export class Template implements TemplateInterface {
    constructor(
        public name: string,
        public versionId: string,
        public version?: {
            id: string,
            version: string,
            referentialName: string,
        },
        public id?: string,
        public ownerId?: string,
        public elements?: TemplateElement[],
        public questions: TemplateQuestion[] = [],
    ) {}

    getNextQuestionNumber(): number {
        if (this.questions.length === 0) {
            return 1;
        }

        return (Math.max(...this.questions.map(q => q.ordering))) + 1;
    }

    getQuestionSorted(): TemplateQuestion[] {
        return this.questions.sort((a, b) => a.ordering > b.ordering ? +1 : -1);
    }

    updateQuestionOrdering(newOrdering: number, fromOrdering: number) {
        const updatedQuestions = [];
        if (newOrdering > fromOrdering) {
            for (const question of this.questions) {
                if (question.ordering === fromOrdering) {
                    question.ordering = newOrdering;
                } else if (question.ordering > fromOrdering && question.ordering <= newOrdering) {
                    question.ordering--;
                }

                updatedQuestions.push(question);
            }
        } else {
            for (const question of this.questions) {
                if (question.ordering === fromOrdering) {
                    question.ordering = newOrdering;
                } else if (question.ordering >= newOrdering && question.ordering < fromOrdering) {
                    question.ordering++;
                }

                updatedQuestions.push(question);
            }
        }

        return updatedQuestions;
    }

    static fromPayload(props: TemplateInterface) {
        return new Template(
            props.name,
            props.versionId,
            props.version,
            props.id,
            props.ownerId,
            props.elements ? props.elements.map(e => TemplateElement.fromPayload(e)) : [],
            props.questions ? props.questions.map(q => TemplateQuestion.fromPayload(q)) : [],
        )
    }
}