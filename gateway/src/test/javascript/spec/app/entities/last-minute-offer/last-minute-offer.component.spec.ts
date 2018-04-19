/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BemTestModule } from '../../../test.module';
import { LastMinuteOfferComponent } from '../../../../../../main/webapp/app/entities/last-minute-offer/last-minute-offer.component';
import { LastMinuteOfferService } from '../../../../../../main/webapp/app/entities/last-minute-offer/last-minute-offer.service';
import { LastMinuteOffer } from '../../../../../../main/webapp/app/entities/last-minute-offer/last-minute-offer.model';

describe('Component Tests', () => {

    describe('LastMinuteOffer Management Component', () => {
        let comp: LastMinuteOfferComponent;
        let fixture: ComponentFixture<LastMinuteOfferComponent>;
        let service: LastMinuteOfferService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BemTestModule],
                declarations: [LastMinuteOfferComponent],
                providers: [
                    LastMinuteOfferService
                ]
            })
            .overrideTemplate(LastMinuteOfferComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LastMinuteOfferComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LastMinuteOfferService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new LastMinuteOffer(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.lastMinuteOffers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
