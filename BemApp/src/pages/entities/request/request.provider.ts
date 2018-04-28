import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';
// todo: handle dates

import { Request } from './request.model';

@Injectable()
export class RequestService {
    private resourceUrl = Api.API_URL + '/request/api/requests';
    // private resourceUrl = "http://localhost:9080/request/api/requests";

    constructor(private http: HttpClient) { }

    create(request: Request): Observable<Request> {
        return this.http.post(this.resourceUrl, request);
    }

    update(request: Request): Observable<Request> {
        return this.http.put(this.resourceUrl, request);
    }

    find(id: number): Observable<Request> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
