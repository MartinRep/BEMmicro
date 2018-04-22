import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CategoriesComponent } from './categories.component';
import { CategoriesDetailComponent } from './categories-detail.component';
import { CategoriesPopupComponent } from './categories-dialog.component';
import { CategoriesDeletePopupComponent } from './categories-delete-dialog.component';

export const categoriesRoute: Routes = [
    {
        path: 'categories',
        component: CategoriesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bemApp.categories.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'categories/:id',
        component: CategoriesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bemApp.categories.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoriesPopupRoute: Routes = [
    {
        path: 'categories-new',
        component: CategoriesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bemApp.categories.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'categories/:id/edit',
        component: CategoriesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bemApp.categories.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'categories/:id/delete',
        component: CategoriesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bemApp.categories.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
