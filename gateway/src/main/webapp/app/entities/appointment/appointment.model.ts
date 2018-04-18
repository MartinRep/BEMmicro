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

export class Appointment implements BaseEntity {
    constructor(
        public id?: number,
        public category?: Category,
        public name?: string,
        public address?: string,
        public time?: any,
        public messages?: BaseEntity[],
        public users?: BaseEntity[],
    ) {
    }
}
