import type {TemplateStoreInterface} from '../../../domain';
import {templateStore} from '../../../infra/store/template.store';

export class TemplateStoreSingleton {
	private static instance: TemplateStoreInterface;

	constructor() {
		throw new Error('Use TemplateStoreSingleton.getInstance() instead');
	}

	static getInstance(): TemplateStoreInterface {
		if (!TemplateStoreSingleton.instance) {
			TemplateStoreSingleton.instance = templateStore;
		}

		return TemplateStoreSingleton.instance;
	}
}
