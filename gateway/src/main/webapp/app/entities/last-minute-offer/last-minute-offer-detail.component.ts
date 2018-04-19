import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { LastMinuteOffer } from './last-minute-offer.model';
import { LastMinuteOfferService } from './last-minute-offer.service';

@Component({
    selector: 'jhi-last-minute-offer-detail',
    templateUrl: './last-minute-offer-detail.component.html'
})
export class LastMinuteOfferDetailComponent implements OnInit, OnDestroy {

    lastMinuteOffer: LastMinuteOffer;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private lastMinuteOfferService: LastMinuteOfferService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLastMinuteOffers();
    }

    load(id) {
        this.lastMinuteOfferService.find(id)
            .subscribe((lastMinuteOfferResponse: HttpResponse<LastMinuteOffer>) => {
                this.lastMinuteOffer = lastMinuteOfferResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLastMinuteOffers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'lastMinuteOfferListModification',
            (response) => this.load(this.lastMinuteOffer.id)
        );
    }
}
