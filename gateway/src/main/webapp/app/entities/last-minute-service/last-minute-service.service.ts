import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { LastMinuteService } from './last-minute-service.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LastMinuteService>;

@Injectable()
export class LastMinuteServiceService {

    private resourceUrl =  SERVER_API_URL + 'lastminute/api/last-minute-services';
    private resourceSearchUrl = SERVER_API_URL + 'lastminute/api/_search/last-minute-services';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(lastMinuteService: LastMinuteService): Observable<EntityResponseType> {
        const copy = this.convert(lastMinuteService);
        return this.http.post<LastMinuteService>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(lastMinuteService: LastMinuteService): Observable<EntityResponseType> {
        const copy = this.convert(lastMinuteService);
        return this.http.put<LastMinuteService>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LastMinuteService>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LastMinuteService[]>> {
        const options = createRequestOption(req);
        return this.http.get<LastMinuteService[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LastMinuteService[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<LastMinuteService[]>> {
        const options = createRequestOption(req);
        return this.http.get<LastMinuteService[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LastMinuteService[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LastMinuteService = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LastMinuteService[]>): HttpResponse<LastMinuteService[]> {
        const jsonResponse: LastMinuteService[] = res.body;
        const body: LastMinuteService[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LastMinuteService.
     */
    private convertItemFromServer(lastMinuteService: LastMinuteService): LastMinuteService {
        const copy: LastMinuteService = Object.assign({}, lastMinuteService);
        copy.available = this.dateUtils
            .convertDateTimeFromServer(lastMinuteService.available);
        return copy;
    }

    /**
     * Convert a LastMinuteService to a JSON which can be sent to the server.
     */
    private convert(lastMinuteService: LastMinuteService): LastMinuteService {
        const copy: LastMinuteService = Object.assign({}, lastMinuteService);

        copy.available = this.dateUtils.toDate(lastMinuteService.available);
        return copy;
    }
}
