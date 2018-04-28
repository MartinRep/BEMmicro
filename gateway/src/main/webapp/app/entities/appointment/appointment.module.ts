import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    AppointmentService,
    AppointmentPopupService,
    AppointmentComponent,
    AppointmentDetailComponent,
    AppointmentDialogComponent,
    AppointmentPopupComponent,
    AppointmentDeletePopupComponent,
    AppointmentDeleteDialogComponent,
    appointmentRoute,
    appointmentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...appointmentRoute,
    ...appointmentPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AppointmentComponent,
        AppointmentDetailComponent,
        AppointmentDialogComponent,
        AppointmentDeleteDialogComponent,
        AppointmentPopupComponent,
        AppointmentDeletePopupComponent,
    ],
    entryComponents: [
        AppointmentComponent,
        AppointmentDialogComponent,
        AppointmentPopupComponent,
        AppointmentDeleteDialogComponent,
        AppointmentDeletePopupComponent,
    ],
    providers: [
        AppointmentService,
        AppointmentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayAppointmentModule {}
