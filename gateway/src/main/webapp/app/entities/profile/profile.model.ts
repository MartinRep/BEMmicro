import { BaseEntity, User } from './../../shared';

export class Profile implements BaseEntity {
    constructor(
        public id?: number,
        public phNumber?: string,
        public name?: string,
        public user?: User,
        public appointments?: BaseEntity[],
    ) {
    }
}
