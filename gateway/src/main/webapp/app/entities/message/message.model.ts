import { BaseEntity } from './../../shared';

export class Message implements BaseEntity {
    constructor(
        public id?: number,
        public time?: any,
        public content?: string,
        public appointments?: BaseEntity[],
    ) {
    }
}
