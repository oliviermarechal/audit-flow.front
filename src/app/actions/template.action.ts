import { HttpClientSingleton } from '../singleton';
import {TemplateStoreSingleton} from '../singleton/storage/template-store.singleton';
import {Template} from '../../domain/models/template';

export async function fetchTemplates(): Promise<void> {
	const httpClient = HttpClientSingleton.getInstance();
	const response = await httpClient.get('/templates');
	const templateStore = TemplateStoreSingleton.getInstance();

	if (response.ok) {
		const templates: Template[] = (await response.json()).map((d: never) => Template.fromPayload(d));
		await templateStore.setTemplates(templates);
	}
}

export async function createTemplate(template: Template): Promise<{ success: boolean, data?: Template | string }> {
	const httpClient = HttpClientSingleton.getInstance();
	const response = await httpClient.post(
		'/templates',
		{
			name: template.name,
			versionId: template.versionId,
		}
	);

	const data = await response.json();
	if (response.ok) {
		const templateStore = TemplateStoreSingleton.getInstance();
		template.id = data.id;
		await templateStore.addTemplate(template);
	}

	return {
		success: response.ok,
		data: data,
	};
}
