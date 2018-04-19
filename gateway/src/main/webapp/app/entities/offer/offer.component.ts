import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Offer } from './offer.model';
import { OfferService } from './offer.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-offer',
    templateUrl: './offer.component.html'
})
export class OfferComponent implements OnInit, OnDestroy {
offers: Offer[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private offerService: OfferService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.offerService.query().subscribe(
            (res: HttpResponse<Offer[]>) => {
                this.offers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOffers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Offer) {
        return item.id;
    }
    registerChangeInOffers() {
        this.eventSubscriber = this.eventManager.subscribe('offerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
