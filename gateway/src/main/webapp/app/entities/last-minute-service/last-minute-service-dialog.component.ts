import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { LastMinuteService } from './last-minute-service.model';
import { LastMinuteServicePopupService } from './last-minute-service-popup.service';
import { LastMinuteServiceService } from './last-minute-service.service';

@Component({
    selector: 'jhi-last-minute-service-dialog',
    templateUrl: './last-minute-service-dialog.component.html'
})
export class LastMinuteServiceDialogComponent implements OnInit {

    lastMinuteService: LastMinuteService;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private lastMinuteServiceService: LastMinuteServiceService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.lastMinuteService, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.lastMinuteService.id !== undefined) {
            this.subscribeToSaveResponse(
                this.lastMinuteServiceService.update(this.lastMinuteService));
        } else {
            this.subscribeToSaveResponse(
                this.lastMinuteServiceService.create(this.lastMinuteService));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LastMinuteService>>) {
        result.subscribe((res: HttpResponse<LastMinuteService>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LastMinuteService) {
        this.eventManager.broadcast({ name: 'lastMinuteServiceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-last-minute-service-popup',
    template: ''
})
export class LastMinuteServicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lastMinuteServicePopupService: LastMinuteServicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.lastMinuteServicePopupService
                    .open(LastMinuteServiceDialogComponent as Component, params['id']);
            } else {
                this.lastMinuteServicePopupService
                    .open(LastMinuteServiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
