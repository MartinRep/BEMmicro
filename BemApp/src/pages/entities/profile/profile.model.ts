import { BaseEntity, User } from './../../../models';

export class Profile implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public phNumber?: string,
        public pictureContentType?: string,
        public picture?: any,
        public user?: User,
        public location?: BaseEntity,
        public appointments?: BaseEntity[],
    ) {
    }
}
