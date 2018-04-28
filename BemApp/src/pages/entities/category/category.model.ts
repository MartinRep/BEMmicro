import { BaseEntity } from './../../../models';

export class Category implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
