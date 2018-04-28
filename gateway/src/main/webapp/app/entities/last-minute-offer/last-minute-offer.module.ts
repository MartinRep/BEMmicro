import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    LastMinuteOfferService,
    LastMinuteOfferPopupService,
    LastMinuteOfferComponent,
    LastMinuteOfferDetailComponent,
    LastMinuteOfferDialogComponent,
    LastMinuteOfferPopupComponent,
    LastMinuteOfferDeletePopupComponent,
    LastMinuteOfferDeleteDialogComponent,
    lastMinuteOfferRoute,
    lastMinuteOfferPopupRoute,
} from './';

const ENTITY_STATES = [
    ...lastMinuteOfferRoute,
    ...lastMinuteOfferPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LastMinuteOfferComponent,
        LastMinuteOfferDetailComponent,
        LastMinuteOfferDialogComponent,
        LastMinuteOfferDeleteDialogComponent,
        LastMinuteOfferPopupComponent,
        LastMinuteOfferDeletePopupComponent,
    ],
    entryComponents: [
        LastMinuteOfferComponent,
        LastMinuteOfferDialogComponent,
        LastMinuteOfferPopupComponent,
        LastMinuteOfferDeleteDialogComponent,
        LastMinuteOfferDeletePopupComponent,
    ],
    providers: [
        LastMinuteOfferService,
        LastMinuteOfferPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayLastMinuteOfferModule {}
