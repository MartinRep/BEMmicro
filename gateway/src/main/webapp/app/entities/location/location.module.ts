import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BemSharedModule } from '../../shared';
import {
    LocationService,
    LocationPopupService,
    LocationComponent,
    LocationDetailComponent,
    LocationDialogComponent,
    LocationPopupComponent,
    LocationDeletePopupComponent,
    LocationDeleteDialogComponent,
    locationRoute,
    locationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...locationRoute,
    ...locationPopupRoute,
];

@NgModule({
    imports: [
        BemSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LocationComponent,
        LocationDetailComponent,
        LocationDialogComponent,
        LocationDeleteDialogComponent,
        LocationPopupComponent,
        LocationDeletePopupComponent,
    ],
    entryComponents: [
        LocationComponent,
        LocationDialogComponent,
        LocationPopupComponent,
        LocationDeleteDialogComponent,
        LocationDeletePopupComponent,
    ],
    providers: [
        LocationService,
        LocationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BemLocationModule {}
