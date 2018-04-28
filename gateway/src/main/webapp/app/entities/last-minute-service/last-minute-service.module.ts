import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    LastMinuteServiceService,
    LastMinuteServicePopupService,
    LastMinuteServiceComponent,
    LastMinuteServiceDetailComponent,
    LastMinuteServiceDialogComponent,
    LastMinuteServicePopupComponent,
    LastMinuteServiceDeletePopupComponent,
    LastMinuteServiceDeleteDialogComponent,
    lastMinuteServiceRoute,
    lastMinuteServicePopupRoute,
    LastMinuteServiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...lastMinuteServiceRoute,
    ...lastMinuteServicePopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LastMinuteServiceComponent,
        LastMinuteServiceDetailComponent,
        LastMinuteServiceDialogComponent,
        LastMinuteServiceDeleteDialogComponent,
        LastMinuteServicePopupComponent,
        LastMinuteServiceDeletePopupComponent,
    ],
    entryComponents: [
        LastMinuteServiceComponent,
        LastMinuteServiceDialogComponent,
        LastMinuteServicePopupComponent,
        LastMinuteServiceDeleteDialogComponent,
        LastMinuteServiceDeletePopupComponent,
    ],
    providers: [
        LastMinuteServiceService,
        LastMinuteServicePopupService,
        LastMinuteServiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayLastMinuteServiceModule {}
