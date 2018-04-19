/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BemTestModule } from '../../../test.module';
import { LastMinuteOfferDetailComponent } from '../../../../../../main/webapp/app/entities/last-minute-offer/last-minute-offer-detail.component';
import { LastMinuteOfferService } from '../../../../../../main/webapp/app/entities/last-minute-offer/last-minute-offer.service';
import { LastMinuteOffer } from '../../../../../../main/webapp/app/entities/last-minute-offer/last-minute-offer.model';

describe('Component Tests', () => {

    describe('LastMinuteOffer Management Detail Component', () => {
        let comp: LastMinuteOfferDetailComponent;
        let fixture: ComponentFixture<LastMinuteOfferDetailComponent>;
        let service: LastMinuteOfferService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BemTestModule],
                declarations: [LastMinuteOfferDetailComponent],
                providers: [
                    LastMinuteOfferService
                ]
            })
            .overrideTemplate(LastMinuteOfferDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LastMinuteOfferDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LastMinuteOfferService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new LastMinuteOffer(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.lastMinuteOffer).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
