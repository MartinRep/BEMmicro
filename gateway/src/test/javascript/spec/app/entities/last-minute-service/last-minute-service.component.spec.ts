/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { LastMinuteServiceComponent } from '../../../../../../main/webapp/app/entities/last-minute-service/last-minute-service.component';
import { LastMinuteServiceService } from '../../../../../../main/webapp/app/entities/last-minute-service/last-minute-service.service';
import { LastMinuteService } from '../../../../../../main/webapp/app/entities/last-minute-service/last-minute-service.model';

describe('Component Tests', () => {

    describe('LastMinuteService Management Component', () => {
        let comp: LastMinuteServiceComponent;
        let fixture: ComponentFixture<LastMinuteServiceComponent>;
        let service: LastMinuteServiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [LastMinuteServiceComponent],
                providers: [
                    LastMinuteServiceService
                ]
            })
            .overrideTemplate(LastMinuteServiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LastMinuteServiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LastMinuteServiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new LastMinuteService(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.lastMinuteServices[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
