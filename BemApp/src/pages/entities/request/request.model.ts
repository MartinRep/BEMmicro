import { BaseEntity } from './../../../models';

export class Request implements BaseEntity {
    constructor(
        public id?: number,
        public category?: string,
        public region?: string,
        public description?: string,
        public duration?: any,
        public expPrice?: number,
        public imageContentType?: string,
        public image?: any,
        public profile?: string,
        public posted?: any,
        public offers?: BaseEntity[],
    ) {
    }
}
