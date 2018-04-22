import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Categories } from './categories.model';
import { CategoriesPopupService } from './categories-popup.service';
import { CategoriesService } from './categories.service';
import { Appointment, AppointmentService } from '../appointment';

@Component({
    selector: 'jhi-categories-dialog',
    templateUrl: './categories-dialog.component.html'
})
export class CategoriesDialogComponent implements OnInit {

    categories: Categories;
    isSaving: boolean;

    appointments: Appointment[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private categoriesService: CategoriesService,
        private appointmentService: AppointmentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.appointmentService.query()
            .subscribe((res: HttpResponse<Appointment[]>) => { this.appointments = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.categories.id !== undefined) {
            this.subscribeToSaveResponse(
                this.categoriesService.update(this.categories));
        } else {
            this.subscribeToSaveResponse(
                this.categoriesService.create(this.categories));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Categories>>) {
        result.subscribe((res: HttpResponse<Categories>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Categories) {
        this.eventManager.broadcast({ name: 'categoriesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAppointmentById(index: number, item: Appointment) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-categories-popup',
    template: ''
})
export class CategoriesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private categoriesPopupService: CategoriesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.categoriesPopupService
                    .open(CategoriesDialogComponent as Component, params['id']);
            } else {
                this.categoriesPopupService
                    .open(CategoriesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
