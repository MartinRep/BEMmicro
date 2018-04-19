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

export class LastMinuteService implements BaseEntity {
    constructor(
        public id?: number,
        public category?: Category,
        public name?: string,
        public time?: any,
        public price?: number,
        public address?: string,
        public user?: number,
        public purchases?: BaseEntity[],
        public profile?: BaseEntity,
    ) {
    }
}
