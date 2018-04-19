/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BemTestModule } from '../../../test.module';
import { LastMinuteOfferDialogComponent } from '../../../../../../main/webapp/app/entities/last-minute-offer/last-minute-offer-dialog.component';
import { LastMinuteOfferService } from '../../../../../../main/webapp/app/entities/last-minute-offer/last-minute-offer.service';
import { LastMinuteOffer } from '../../../../../../main/webapp/app/entities/last-minute-offer/last-minute-offer.model';
import { LastMinuteServiceService } from '../../../../../../main/webapp/app/entities/last-minute-service';
import { ProfileService } from '../../../../../../main/webapp/app/entities/profile';

describe('Component Tests', () => {

    describe('LastMinuteOffer Management Dialog Component', () => {
        let comp: LastMinuteOfferDialogComponent;
        let fixture: ComponentFixture<LastMinuteOfferDialogComponent>;
        let service: LastMinuteOfferService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BemTestModule],
                declarations: [LastMinuteOfferDialogComponent],
                providers: [
                    LastMinuteServiceService,
                    ProfileService,
                    LastMinuteOfferService
                ]
            })
            .overrideTemplate(LastMinuteOfferDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LastMinuteOfferDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LastMinuteOfferService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LastMinuteOffer(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.lastMinuteOffer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'lastMinuteOfferListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LastMinuteOffer();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.lastMinuteOffer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'lastMinuteOfferListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
