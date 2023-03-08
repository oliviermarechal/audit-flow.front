import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type {Template} from '../../domain/models/template';
import type {TemplateStoreInterface} from '../../domain';

export const templates = writable<Template[]>([]);
export const apiError = writable<string | undefined>();

class TemplateStore implements TemplateStoreInterface {
	constructor(
		private readonly templateWritable: Writable<Template[]>,
		private readonly referentialApiError: Writable<string | undefined>
	) {}

	async setTemplates(templates: Template[]) {
		this.templateWritable.set(templates);
	}

	async addTemplate(template: Template) {
		this.templateWritable.update((templates) => {
			return [
				...templates,
				template,
			];
		});
	}
}

export const templateStore = new TemplateStore(templates, apiError);
