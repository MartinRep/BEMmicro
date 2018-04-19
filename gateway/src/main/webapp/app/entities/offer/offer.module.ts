import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BemSharedModule } from '../../shared';
import {
    OfferService,
    OfferPopupService,
    OfferComponent,
    OfferDetailComponent,
    OfferDialogComponent,
    OfferPopupComponent,
    OfferDeletePopupComponent,
    OfferDeleteDialogComponent,
    offerRoute,
    offerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...offerRoute,
    ...offerPopupRoute,
];

@NgModule({
    imports: [
        BemSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OfferComponent,
        OfferDetailComponent,
        OfferDialogComponent,
        OfferDeleteDialogComponent,
        OfferPopupComponent,
        OfferDeletePopupComponent,
    ],
    entryComponents: [
        OfferComponent,
        OfferDialogComponent,
        OfferPopupComponent,
        OfferDeleteDialogComponent,
        OfferDeletePopupComponent,
    ],
    providers: [
        OfferService,
        OfferPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BemOfferModule {}
