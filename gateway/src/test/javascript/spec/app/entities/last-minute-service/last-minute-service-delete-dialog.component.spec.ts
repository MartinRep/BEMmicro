/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { LastMinuteServiceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/last-minute-service/last-minute-service-delete-dialog.component';
import { LastMinuteServiceService } from '../../../../../../main/webapp/app/entities/last-minute-service/last-minute-service.service';

describe('Component Tests', () => {

    describe('LastMinuteService Management Delete Component', () => {
        let comp: LastMinuteServiceDeleteDialogComponent;
        let fixture: ComponentFixture<LastMinuteServiceDeleteDialogComponent>;
        let service: LastMinuteServiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [LastMinuteServiceDeleteDialogComponent],
                providers: [
                    LastMinuteServiceService
                ]
            })
            .overrideTemplate(LastMinuteServiceDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LastMinuteServiceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LastMinuteServiceService);
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
