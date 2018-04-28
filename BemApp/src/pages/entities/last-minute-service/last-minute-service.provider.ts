import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';
// todo: handle dates

import { LastMinuteService } from './last-minute-service.model';

@Injectable()
export class LastMinuteServiceService {
    private resourceUrl = Api.API_URL + '/lastminute/api/last-minute-services';

    constructor(private http: HttpClient) { }

    create(lastMinuteService: LastMinuteService): Observable<LastMinuteService> {
        return this.http.post(this.resourceUrl, lastMinuteService);
    }

    update(lastMinuteService: LastMinuteService): Observable<LastMinuteService> {
        return this.http.put(this.resourceUrl, lastMinuteService);
    }

    find(id: number): Observable<LastMinuteService> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
