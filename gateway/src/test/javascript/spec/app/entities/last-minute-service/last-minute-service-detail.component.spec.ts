/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BemTestModule } from '../../../test.module';
import { LastMinuteServiceDetailComponent } from '../../../../../../main/webapp/app/entities/last-minute-service/last-minute-service-detail.component';
import { LastMinuteServiceService } from '../../../../../../main/webapp/app/entities/last-minute-service/last-minute-service.service';
import { LastMinuteService } from '../../../../../../main/webapp/app/entities/last-minute-service/last-minute-service.model';

describe('Component Tests', () => {

    describe('LastMinuteService Management Detail Component', () => {
        let comp: LastMinuteServiceDetailComponent;
        let fixture: ComponentFixture<LastMinuteServiceDetailComponent>;
        let service: LastMinuteServiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BemTestModule],
                declarations: [LastMinuteServiceDetailComponent],
                providers: [
                    LastMinuteServiceService
                ]
            })
            .overrideTemplate(LastMinuteServiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LastMinuteServiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LastMinuteServiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new LastMinuteService(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.lastMinuteService).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
