import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BemSharedModule } from '../../shared';
import {
    CategoriesService,
    CategoriesPopupService,
    CategoriesComponent,
    CategoriesDetailComponent,
    CategoriesDialogComponent,
    CategoriesPopupComponent,
    CategoriesDeletePopupComponent,
    CategoriesDeleteDialogComponent,
    categoriesRoute,
    categoriesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...categoriesRoute,
    ...categoriesPopupRoute,
];

@NgModule({
    imports: [
        BemSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CategoriesComponent,
        CategoriesDetailComponent,
        CategoriesDialogComponent,
        CategoriesDeleteDialogComponent,
        CategoriesPopupComponent,
        CategoriesDeletePopupComponent,
    ],
    entryComponents: [
        CategoriesComponent,
        CategoriesDialogComponent,
        CategoriesPopupComponent,
        CategoriesDeleteDialogComponent,
        CategoriesDeletePopupComponent,
    ],
    providers: [
        CategoriesService,
        CategoriesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BemCategoriesModule {}
