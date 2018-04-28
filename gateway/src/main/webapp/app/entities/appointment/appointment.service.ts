import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Appointment } from './appointment.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Appointment>;

@Injectable()
export class AppointmentService {

    private resourceUrl =  SERVER_API_URL + 'api/appointments';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/appointments';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(appointment: Appointment): Observable<EntityResponseType> {
        const copy = this.convert(appointment);
        return this.http.post<Appointment>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(appointment: Appointment): Observable<EntityResponseType> {
        const copy = this.convert(appointment);
        return this.http.put<Appointment>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Appointment>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Appointment[]>> {
        const options = createRequestOption(req);
        return this.http.get<Appointment[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Appointment[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Appointment[]>> {
        const options = createRequestOption(req);
        return this.http.get<Appointment[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Appointment[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Appointment = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Appointment[]>): HttpResponse<Appointment[]> {
        const jsonResponse: Appointment[] = res.body;
        const body: Appointment[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Appointment.
     */
    private convertItemFromServer(appointment: Appointment): Appointment {
        const copy: Appointment = Object.assign({}, appointment);
        copy.time = this.dateUtils
            .convertDateTimeFromServer(appointment.time);
        return copy;
    }

    /**
     * Convert a Appointment to a JSON which can be sent to the server.
     */
    private convert(appointment: Appointment): Appointment {
        const copy: Appointment = Object.assign({}, appointment);

        copy.time = this.dateUtils.toDate(appointment.time);
        return copy;
    }
}
