import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AppointmentComponent } from './appointment.component';
import { AppointmentDetailComponent } from './appointment-detail.component';
import { AppointmentPopupComponent } from './appointment-dialog.component';
import { AppointmentDeletePopupComponent } from './appointment-delete-dialog.component';

export const appointmentRoute: Routes = [
    {
        path: 'appointment',
        component: AppointmentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.appointment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'appointment/:id',
        component: AppointmentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.appointment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const appointmentPopupRoute: Routes = [
    {
        path: 'appointment-new',
        component: AppointmentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.appointment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'appointment/:id/edit',
        component: AppointmentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.appointment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'appointment/:id/delete',
        component: AppointmentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.appointment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
