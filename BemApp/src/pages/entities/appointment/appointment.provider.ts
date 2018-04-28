import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';
// todo: handle dates

import { Appointment } from './appointment.model';

@Injectable()
export class AppointmentService {
    private resourceUrl = Api.API_URL + '/api/appointments';

    constructor(private http: HttpClient) { }

    create(appointment: Appointment): Observable<Appointment> {
        return this.http.post(this.resourceUrl, appointment);
    }

    update(appointment: Appointment): Observable<Appointment> {
        return this.http.put(this.resourceUrl, appointment);
    }

    find(id: number): Observable<Appointment> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
