import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { LastMinuteOffer } from './last-minute-offer.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LastMinuteOffer>;

@Injectable()
export class LastMinuteOfferService {

    private resourceUrl =  SERVER_API_URL + 'lastminute/api/last-minute-offers';
    private resourceSearchUrl = SERVER_API_URL + 'lastminute/api/_search/last-minute-offers';

    constructor(private http: HttpClient) { }

    create(lastMinuteOffer: LastMinuteOffer): Observable<EntityResponseType> {
        const copy = this.convert(lastMinuteOffer);
        return this.http.post<LastMinuteOffer>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(lastMinuteOffer: LastMinuteOffer): Observable<EntityResponseType> {
        const copy = this.convert(lastMinuteOffer);
        return this.http.put<LastMinuteOffer>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LastMinuteOffer>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LastMinuteOffer[]>> {
        const options = createRequestOption(req);
        return this.http.get<LastMinuteOffer[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LastMinuteOffer[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<LastMinuteOffer[]>> {
        const options = createRequestOption(req);
        return this.http.get<LastMinuteOffer[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LastMinuteOffer[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LastMinuteOffer = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LastMinuteOffer[]>): HttpResponse<LastMinuteOffer[]> {
        const jsonResponse: LastMinuteOffer[] = res.body;
        const body: LastMinuteOffer[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LastMinuteOffer.
     */
    private convertItemFromServer(lastMinuteOffer: LastMinuteOffer): LastMinuteOffer {
        const copy: LastMinuteOffer = Object.assign({}, lastMinuteOffer);
        return copy;
    }

    /**
     * Convert a LastMinuteOffer to a JSON which can be sent to the server.
     */
    private convert(lastMinuteOffer: LastMinuteOffer): LastMinuteOffer {
        const copy: LastMinuteOffer = Object.assign({}, lastMinuteOffer);
        return copy;
    }
}
