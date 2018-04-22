import { BaseEntity } from './../../shared';

export class Categories implements BaseEntity {
    constructor(
        public id?: number,
        public category?: string,
        public appointment?: BaseEntity,
    ) {
    }
}
