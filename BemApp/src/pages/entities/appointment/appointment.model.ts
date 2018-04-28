import { BaseEntity } from './../../../models';

export class Appointment implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public address?: string,
        public time?: any,
        public location?: BaseEntity,
        public category?: BaseEntity,
        public profiles?: BaseEntity[],
        public messages?: BaseEntity[],
    ) {
    }
}
