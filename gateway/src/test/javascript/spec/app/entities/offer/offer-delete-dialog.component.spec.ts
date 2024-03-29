/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { OfferDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/offer/offer-delete-dialog.component';
import { OfferService } from '../../../../../../main/webapp/app/entities/offer/offer.service';

describe('Component Tests', () => {

    describe('Offer Management Delete Component', () => {
        let comp: OfferDeleteDialogComponent;
        let fixture: ComponentFixture<OfferDeleteDialogComponent>;
        let service: OfferService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [OfferDeleteDialogComponent],
                providers: [
                    OfferService
                ]
            })
            .overrideTemplate(OfferDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OfferDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OfferService);
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
