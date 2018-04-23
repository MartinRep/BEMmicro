import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LastMinuteOffer } from './last-minute-offer.model';
import { LastMinuteOfferPopupService } from './last-minute-offer-popup.service';
import { LastMinuteOfferService } from './last-minute-offer.service';
import { LastMinuteService, LastMinuteServiceService } from '../last-minute-service';

@Component({
    selector: 'jhi-last-minute-offer-dialog',
    templateUrl: './last-minute-offer-dialog.component.html'
})
export class LastMinuteOfferDialogComponent implements OnInit {

    lastMinuteOffer: LastMinuteOffer;
    isSaving: boolean;

    lastminuteservices: LastMinuteService[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private lastMinuteOfferService: LastMinuteOfferService,
        private lastMinuteServiceService: LastMinuteServiceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.lastMinuteServiceService.query()
            .subscribe((res: HttpResponse<LastMinuteService[]>) => { this.lastminuteservices = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.lastMinuteOffer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.lastMinuteOfferService.update(this.lastMinuteOffer));
        } else {
            this.subscribeToSaveResponse(
                this.lastMinuteOfferService.create(this.lastMinuteOffer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LastMinuteOffer>>) {
        result.subscribe((res: HttpResponse<LastMinuteOffer>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LastMinuteOffer) {
        this.eventManager.broadcast({ name: 'lastMinuteOfferListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLastMinuteServiceById(index: number, item: LastMinuteService) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-last-minute-offer-popup',
    template: ''
})
export class LastMinuteOfferPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lastMinuteOfferPopupService: LastMinuteOfferPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.lastMinuteOfferPopupService
                    .open(LastMinuteOfferDialogComponent as Component, params['id']);
            } else {
                this.lastMinuteOfferPopupService
                    .open(LastMinuteOfferDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
