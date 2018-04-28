import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LastMinuteOffer } from './last-minute-offer.model';
import { LastMinuteOfferService } from './last-minute-offer.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-last-minute-offer',
    templateUrl: './last-minute-offer.component.html'
})
export class LastMinuteOfferComponent implements OnInit, OnDestroy {
lastMinuteOffers: LastMinuteOffer[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private lastMinuteOfferService: LastMinuteOfferService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.lastMinuteOfferService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<LastMinuteOffer[]>) => this.lastMinuteOffers = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.lastMinuteOfferService.query().subscribe(
            (res: HttpResponse<LastMinuteOffer[]>) => {
                this.lastMinuteOffers = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLastMinuteOffers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: LastMinuteOffer) {
        return item.id;
    }
    registerChangeInLastMinuteOffers() {
        this.eventSubscriber = this.eventManager.subscribe('lastMinuteOfferListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
