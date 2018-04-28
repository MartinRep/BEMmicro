import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { Location } from './location.model';

@Injectable()
export class LocationService {
    private resourceUrl = Api.API_URL + '/api/locations';

    constructor(private http: HttpClient) { }

    create(location: Location): Observable<Location> {
        return this.http.post(this.resourceUrl, location);
    }

    update(location: Location): Observable<Location> {
        return this.http.put(this.resourceUrl, location);
    }

    find(id: number): Observable<Location> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
