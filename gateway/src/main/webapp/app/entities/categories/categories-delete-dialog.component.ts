import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Categories } from './categories.model';
import { CategoriesPopupService } from './categories-popup.service';
import { CategoriesService } from './categories.service';

@Component({
    selector: 'jhi-categories-delete-dialog',
    templateUrl: './categories-delete-dialog.component.html'
})
export class CategoriesDeleteDialogComponent {

    categories: Categories;

    constructor(
        private categoriesService: CategoriesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.categoriesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'categoriesListModification',
                content: 'Deleted an categories'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-categories-delete-popup',
    template: ''
})
export class CategoriesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private categoriesPopupService: CategoriesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.categoriesPopupService
                .open(CategoriesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
