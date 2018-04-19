import { BaseEntity } from './../../shared';

export class LastMinuteOffer implements BaseEntity {
    constructor(
        public id?: number,
        public price?: number,
        public user?: number,
        public service?: BaseEntity,
        public profile?: BaseEntity,
    ) {
    }
}
