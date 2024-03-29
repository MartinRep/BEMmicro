import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';
// todo: handle dates

import { Message } from './message.model';

@Injectable()
export class MessageService {
    private resourceUrl = Api.API_URL + '/api/messages';

    constructor(private http: HttpClient) { }

    create(message: Message): Observable<Message> {
        return this.http.post(this.resourceUrl, message);
    }

    update(message: Message): Observable<Message> {
        return this.http.put(this.resourceUrl, message);
    }

    find(id: number): Observable<Message> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
