/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { LastMinuteOfferDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/last-minute-offer/last-minute-offer-delete-dialog.component';
import { LastMinuteOfferService } from '../../../../../../main/webapp/app/entities/last-minute-offer/last-minute-offer.service';

describe('Component Tests', () => {

    describe('LastMinuteOffer Management Delete Component', () => {
        let comp: LastMinuteOfferDeleteDialogComponent;
        let fixture: ComponentFixture<LastMinuteOfferDeleteDialogComponent>;
        let service: LastMinuteOfferService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [LastMinuteOfferDeleteDialogComponent],
                providers: [
                    LastMinuteOfferService
                ]
            })
            .overrideTemplate(LastMinuteOfferDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LastMinuteOfferDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LastMinuteOfferService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
