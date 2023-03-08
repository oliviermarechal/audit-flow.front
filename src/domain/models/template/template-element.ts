import type {TemplateQuestionInterface} from './template-question';
import {TemplateQuestion} from './template-question';

export interface TemplateElementInterface {
    id?: string;
    name: string;
    templateId: string;
    questions?: TemplateQuestionInterface[];
}

export class TemplateElement {
    constructor(
        public name: string,
        public templateId: string,
        public questions: TemplateQuestion[] = [],
        public id?: string,
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

    static fromPayload(props: TemplateElementInterface) {
        return new TemplateElement(
            props.name,
            props.templateId,
            props.questions && props.questions.length > 0 ? props.questions.map(q => TemplateQuestion.fromPayload(q)) : [],
            props.id,
        )
    }
}