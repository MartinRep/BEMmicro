import { BaseEntity } from './../../shared';

export class Location implements BaseEntity {
    constructor(
        public id?: number,
        public region?: string,
        public profiles?: BaseEntity[],
    ) {
    }
}
