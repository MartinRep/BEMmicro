import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { LastMinuteOffer } from './last-minute-offer.model';

@Injectable()
export class LastMinuteOfferService {
    private resourceUrl = Api.API_URL + '/lastminute/api/last-minute-offers';

    constructor(private http: HttpClient) { }

    create(lastMinuteOffer: LastMinuteOffer): Observable<LastMinuteOffer> {
        return this.http.post(this.resourceUrl, lastMinuteOffer);
    }

    update(lastMinuteOffer: LastMinuteOffer): Observable<LastMinuteOffer> {
        return this.http.put(this.resourceUrl, lastMinuteOffer);
    }

    find(id: number): Observable<LastMinuteOffer> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
