/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BemTestModule } from '../../../test.module';
import { AppointmentComponent } from '../../../../../../main/webapp/app/entities/appointment/appointment.component';
import { AppointmentService } from '../../../../../../main/webapp/app/entities/appointment/appointment.service';
import { Appointment } from '../../../../../../main/webapp/app/entities/appointment/appointment.model';

describe('Component Tests', () => {

    describe('Appointment Management Component', () => {
        let comp: AppointmentComponent;
        let fixture: ComponentFixture<AppointmentComponent>;
        let service: AppointmentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BemTestModule],
                declarations: [AppointmentComponent],
                providers: [
                    AppointmentService
                ]
            })
            .overrideTemplate(AppointmentComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AppointmentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AppointmentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Appointment(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.appointments[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
