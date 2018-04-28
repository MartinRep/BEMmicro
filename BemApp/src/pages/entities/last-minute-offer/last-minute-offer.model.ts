import { BaseEntity } from './../../../models';

export class LastMinuteOffer implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public profile?: string,
        public lastMinuteService?: BaseEntity,
    ) {
    }
}
