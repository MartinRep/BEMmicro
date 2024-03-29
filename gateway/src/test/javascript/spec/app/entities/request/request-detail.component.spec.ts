/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { RequestDetailComponent } from '../../../../../../main/webapp/app/entities/request/request-detail.component';
import { RequestService } from '../../../../../../main/webapp/app/entities/request/request.service';
import { Request } from '../../../../../../main/webapp/app/entities/request/request.model';

describe('Component Tests', () => {

    describe('Request Management Detail Component', () => {
        let comp: RequestDetailComponent;
        let fixture: ComponentFixture<RequestDetailComponent>;
        let service: RequestService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [RequestDetailComponent],
                providers: [
                    RequestService
                ]
            })
            .overrideTemplate(RequestDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RequestDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RequestService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Request(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.request).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
