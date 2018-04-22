import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Categories } from './categories.model';
import { CategoriesService } from './categories.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-categories',
    templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit, OnDestroy {
categories: Categories[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private categoriesService: CategoriesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.categoriesService.query().subscribe(
            (res: HttpResponse<Categories[]>) => {
                this.categories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Categories) {
        return item.id;
    }
    registerChangeInCategories() {
        this.eventSubscriber = this.eventManager.subscribe('categoriesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
