import { BaseEntity } from './../../shared';

export class Offer implements BaseEntity {
    constructor(
        public id?: number,
        public price?: number,
        public description?: string,
        public availableOn?: any,
        public profile?: number,
        public request?: BaseEntity,
    ) {
    }
}
