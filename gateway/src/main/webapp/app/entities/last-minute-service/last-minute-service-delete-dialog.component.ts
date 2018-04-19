import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LastMinuteService } from './last-minute-service.model';
import { LastMinuteServicePopupService } from './last-minute-service-popup.service';
import { LastMinuteServiceService } from './last-minute-service.service';

@Component({
    selector: 'jhi-last-minute-service-delete-dialog',
    templateUrl: './last-minute-service-delete-dialog.component.html'
})
export class LastMinuteServiceDeleteDialogComponent {

    lastMinuteService: LastMinuteService;

    constructor(
        private lastMinuteServiceService: LastMinuteServiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.lastMinuteServiceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'lastMinuteServiceListModification',
                content: 'Deleted an lastMinuteService'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-last-minute-service-delete-popup',
    template: ''
})
export class LastMinuteServiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lastMinuteServicePopupService: LastMinuteServicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.lastMinuteServicePopupService
                .open(LastMinuteServiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
