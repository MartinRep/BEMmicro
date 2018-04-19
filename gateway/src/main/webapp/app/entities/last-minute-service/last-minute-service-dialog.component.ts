import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LastMinuteService } from './last-minute-service.model';
import { LastMinuteServicePopupService } from './last-minute-service-popup.service';
import { LastMinuteServiceService } from './last-minute-service.service';
import { Profile, ProfileService } from '../profile';

@Component({
    selector: 'jhi-last-minute-service-dialog',
    templateUrl: './last-minute-service-dialog.component.html'
})
export class LastMinuteServiceDialogComponent implements OnInit {

    lastMinuteService: LastMinuteService;
    isSaving: boolean;

    profiles: Profile[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private lastMinuteServiceService: LastMinuteServiceService,
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

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProfileById(index: number, item: Profile) {
        return item.id;
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
