import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Request } from './request.model';
import { RequestPopupService } from './request-popup.service';
import { RequestService } from './request.service';
import { Profile, ProfileService } from '../profile';

@Component({
    selector: 'jhi-request-dialog',
    templateUrl: './request-dialog.component.html'
})
export class RequestDialogComponent implements OnInit {

    request: Request;
    isSaving: boolean;

    profiles: Profile[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private requestService: RequestService,
        private profileService: ProfileService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.profileService.query()
            .subscribe((res: HttpResponse<Profile[]>) => { this.profiles = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.request.id !== undefined) {
            this.subscribeToSaveResponse(
                this.requestService.update(this.request));
        } else {
            this.subscribeToSaveResponse(
                this.requestService.create(this.request));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Request>>) {
        result.subscribe((res: HttpResponse<Request>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Request) {
        this.eventManager.broadcast({ name: 'requestListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProfileById(index: number, item: Profile) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-request-popup',
    template: ''
})
export class RequestPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private requestPopupService: RequestPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.requestPopupService
                    .open(RequestDialogComponent as Component, params['id']);
            } else {
                this.requestPopupService
                    .open(RequestDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
