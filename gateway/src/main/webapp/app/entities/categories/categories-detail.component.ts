import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Categories } from './categories.model';
import { CategoriesService } from './categories.service';

@Component({
    selector: 'jhi-categories-detail',
    templateUrl: './categories-detail.component.html'
})
export class CategoriesDetailComponent implements OnInit, OnDestroy {

    categories: Categories;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private categoriesService: CategoriesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCategories();
    }

    load(id) {
        this.categoriesService.find(id)
            .subscribe((categoriesResponse: HttpResponse<Categories>) => {
                this.categories = categoriesResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCategories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'categoriesListModification',
            (response) => this.load(this.categories.id)
        );
    }
}
