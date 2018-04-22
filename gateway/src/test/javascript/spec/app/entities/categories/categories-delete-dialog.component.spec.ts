/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BemTestModule } from '../../../test.module';
import { CategoriesDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/categories/categories-delete-dialog.component';
import { CategoriesService } from '../../../../../../main/webapp/app/entities/categories/categories.service';

describe('Component Tests', () => {

    describe('Categories Management Delete Component', () => {
        let comp: CategoriesDeleteDialogComponent;
        let fixture: ComponentFixture<CategoriesDeleteDialogComponent>;
        let service: CategoriesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BemTestModule],
                declarations: [CategoriesDeleteDialogComponent],
                providers: [
                    CategoriesService
                ]
            })
            .overrideTemplate(CategoriesDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoriesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoriesService);
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
