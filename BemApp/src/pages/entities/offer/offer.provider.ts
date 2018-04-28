import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';
// todo: handle dates

import { Offer } from './offer.model';

@Injectable()
export class OfferService {
    private resourceUrl = Api.API_URL + '/request/api/offers';

    constructor(private http: HttpClient) { }

    create(offer: Offer): Observable<Offer> {
        return this.http.post(this.resourceUrl, offer);
    }

    update(offer: Offer): Observable<Offer> {
        return this.http.put(this.resourceUrl, offer);
    }

    find(id: number): Observable<Offer> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
