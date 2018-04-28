/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { AppointmentDetailComponent } from '../../../../../../main/webapp/app/entities/appointment/appointment-detail.component';
import { AppointmentService } from '../../../../../../main/webapp/app/entities/appointment/appointment.service';
import { Appointment } from '../../../../../../main/webapp/app/entities/appointment/appointment.model';

describe('Component Tests', () => {

    describe('Appointment Management Detail Component', () => {
        let comp: AppointmentDetailComponent;
        let fixture: ComponentFixture<AppointmentDetailComponent>;
        let service: AppointmentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [AppointmentDetailComponent],
                providers: [
                    AppointmentService
                ]
            })
            .overrideTemplate(AppointmentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AppointmentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AppointmentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Appointment(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.appointment).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
