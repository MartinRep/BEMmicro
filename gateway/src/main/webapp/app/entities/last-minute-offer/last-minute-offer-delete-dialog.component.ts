import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LastMinuteOffer } from './last-minute-offer.model';
import { LastMinuteOfferPopupService } from './last-minute-offer-popup.service';
import { LastMinuteOfferService } from './last-minute-offer.service';

@Component({
    selector: 'jhi-last-minute-offer-delete-dialog',
    templateUrl: './last-minute-offer-delete-dialog.component.html'
})
export class LastMinuteOfferDeleteDialogComponent {

    lastMinuteOffer: LastMinuteOffer;

    constructor(
        private lastMinuteOfferService: LastMinuteOfferService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.lastMinuteOfferService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'lastMinuteOfferListModification',
                content: 'Deleted an lastMinuteOffer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-last-minute-offer-delete-popup',
    template: ''
})
export class LastMinuteOfferDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lastMinuteOfferPopupService: LastMinuteOfferPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.lastMinuteOfferPopupService
                .open(LastMinuteOfferDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
