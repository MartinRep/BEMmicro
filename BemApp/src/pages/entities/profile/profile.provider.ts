import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { Profile } from './profile.model';

@Injectable()
export class ProfileService {
    private resourceUrl = Api.API_URL + '/api/profiles';

    constructor(private http: HttpClient) { }

    create(profile: Profile): Observable<Profile> {
        return this.http.post(this.resourceUrl, profile);
    }

    update(profile: Profile): Observable<Profile> {
        return this.http.put(this.resourceUrl, profile);
    }

    find(id: number): Observable<Profile> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
