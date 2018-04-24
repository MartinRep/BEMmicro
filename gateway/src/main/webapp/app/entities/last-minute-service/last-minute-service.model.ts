import { BaseEntity } from './../../shared';

export class LastMinuteService implements BaseEntity {
    constructor(
        public id?: number,
        public category?: number,
        public description?: string,
        public price?: number,
        public address?: string,
        public available?: any,
        public location?: string,
        public imageContentType?: string,
        public image?: any,
        public profile?: number,
        public lastMinuteOffers?: BaseEntity[],
    ) {
    }
}
