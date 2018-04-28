import { BaseEntity } from './../../shared';

export class Offer implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public availableOn?: any,
        public price?: number,
        public profile?: string,
        public request?: BaseEntity,
    ) {
    }
}
