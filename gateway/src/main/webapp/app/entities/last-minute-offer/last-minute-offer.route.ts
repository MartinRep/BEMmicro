import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { LastMinuteOfferComponent } from './last-minute-offer.component';
import { LastMinuteOfferDetailComponent } from './last-minute-offer-detail.component';
import { LastMinuteOfferPopupComponent } from './last-minute-offer-dialog.component';
import { LastMinuteOfferDeletePopupComponent } from './last-minute-offer-delete-dialog.component';

export const lastMinuteOfferRoute: Routes = [
    {
        path: 'last-minute-offer',
        component: LastMinuteOfferComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bemApp.lastMinuteOffer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'last-minute-offer/:id',
        component: LastMinuteOfferDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bemApp.lastMinuteOffer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const lastMinuteOfferPopupRoute: Routes = [
    {
        path: 'last-minute-offer-new',
        component: LastMinuteOfferPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bemApp.lastMinuteOffer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'last-minute-offer/:id/edit',
        component: LastMinuteOfferPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bemApp.lastMinuteOffer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'last-minute-offer/:id/delete',
        component: LastMinuteOfferDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bemApp.lastMinuteOffer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
