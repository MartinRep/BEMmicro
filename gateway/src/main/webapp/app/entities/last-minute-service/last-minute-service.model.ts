import { BaseEntity } from './../../shared';

export class LastMinuteService implements BaseEntity {
    constructor(
        public id?: number,
        public category?: number,
        public description?: string,
        public available?: any,
        public location?: string,
        public price?: number,
        public address?: string,
        public imageContentType?: string,
        public image?: any,
        public profile?: string,
        public lastminuteOffers?: BaseEntity[],
    ) {
    }
}
