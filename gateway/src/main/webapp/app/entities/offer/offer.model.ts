import { BaseEntity } from './../../shared';

export class Offer implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public time?: any,
        public price?: number,
        public user?: number,
        public request?: BaseEntity,
        public profile?: BaseEntity,
    ) {
    }
}
