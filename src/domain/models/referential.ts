import type { ReferentialVersionInterface } from './referential-version';

export interface ReferentialInterface {
	id?: string | null;
	label: string | null;
	url?: string | null;
	isPublic: boolean;
	ownerId?: string;
	description: string | null;
	updatedAt?: Date;
	versions?: ReferentialVersionInterface[];
}

export class Referential implements ReferentialInterface {
	constructor(
		public label: string | null,
		public description: string | null,
		public id?: string | null,
		public url?: string | null,
		public isPublic: boolean = true,
		public ownerId?: string,
		public updatedAt?: Date,
		public versions?: ReferentialVersionInterface[]
	) {}

	public static fromPayload(data: ReferentialInterface) {
		return new Referential(
			data.label,
			data.description,
			data.id,
			data.url,
			data.isPublic,
			data.ownerId,
			data.updatedAt,
			data.versions
		);
	}

	public isValidToSubmit(): boolean {
		return !(!this.label || !this.description);
	}

	public hasId(): boolean {
		return !!this.id;
	}
}
