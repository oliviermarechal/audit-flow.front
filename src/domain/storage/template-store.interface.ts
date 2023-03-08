import type {Template} from '../models/template';

export interface TemplateStoreInterface {
    setTemplates(templates: Template[]): Promise<void>;
    addTemplate(template: Template): Promise<void>;
}
