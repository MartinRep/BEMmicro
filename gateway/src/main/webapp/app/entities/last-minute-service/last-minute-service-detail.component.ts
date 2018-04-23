import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { LastMinuteService } from './last-minute-service.model';
import { LastMinuteServiceService } from './last-minute-service.service';

@Component({
    selector: 'jhi-last-minute-service-detail',
    templateUrl: './last-minute-service-detail.component.html'
})
export class LastMinuteServiceDetailComponent implements OnInit, OnDestroy {

    lastMinuteService: LastMinuteService;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private lastMinuteServiceService: LastMinuteServiceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLastMinuteServices();
    }

    load(id) {
        this.lastMinuteServiceService.find(id)
            .subscribe((lastMinuteServiceResponse: HttpResponse<LastMinuteService>) => {
                this.lastMinuteService = lastMinuteServiceResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLastMinuteServices() {
        this.eventSubscriber = this.eventManager.subscribe(
            'lastMinuteServiceListModification',
            (response) => this.load(this.lastMinuteService.id)
        );
    }
}
