import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Offer } from './offer.model';
import { OfferPopupService } from './offer-popup.service';
import { OfferService } from './offer.service';
import { Request, RequestService } from '../request';

@Component({
    selector: 'jhi-offer-dialog',
    templateUrl: './offer-dialog.component.html'
})
export class OfferDialogComponent implements OnInit {

    offer: Offer;
    isSaving: boolean;

    requests: Request[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private offerService: OfferService,
        private requestService: RequestService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.requestService.query()
            .subscribe((res: HttpResponse<Request[]>) => { this.requests = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.offer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.offerService.update(this.offer));
        } else {
            this.subscribeToSaveResponse(
                this.offerService.create(this.offer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Offer>>) {
        result.subscribe((res: HttpResponse<Offer>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Offer) {
        this.eventManager.broadcast({ name: 'offerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRequestById(index: number, item: Request) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-offer-popup',
    template: ''
})
export class OfferPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private offerPopupService: OfferPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.offerPopupService
                    .open(OfferDialogComponent as Component, params['id']);
            } else {
                this.offerPopupService
                    .open(OfferDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
