import { BaseEntity } from './../../shared';

export const enum Category {
    'FACE',
    'BODY',
    'MEN',
    'DENTAL',
    'HAIR',
    'HEALTH',
    'WELLBEING'
}

export class Request implements BaseEntity {
    constructor(
        public id?: number,
        public category?: Category,
        public name?: string,
        public duration?: any,
        public expPrice?: number,
        public user?: number,
        public offers?: BaseEntity[],
        public profile?: BaseEntity,
    ) {
    }
}
