import { BaseEntity } from './../../shared';

export class LastMinuteOffer implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public profile?: number,
        public service?: BaseEntity,
    ) {
    }
}
