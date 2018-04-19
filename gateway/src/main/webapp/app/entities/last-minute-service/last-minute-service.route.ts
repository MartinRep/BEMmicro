import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { LastMinuteServiceComponent } from './last-minute-service.component';
import { LastMinuteServiceDetailComponent } from './last-minute-service-detail.component';
import { LastMinuteServicePopupComponent } from './last-minute-service-dialog.component';
import { LastMinuteServiceDeletePopupComponent } from './last-minute-service-delete-dialog.component';

@Injectable()
export class LastMinuteServiceResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const lastMinuteServiceRoute: Routes = [
    {
        path: 'last-minute-service',
        component: LastMinuteServiceComponent,
        resolve: {
            'pagingParams': LastMinuteServiceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bemApp.lastMinuteService.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'last-minute-service/:id',
        component: LastMinuteServiceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bemApp.lastMinuteService.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const lastMinuteServicePopupRoute: Routes = [
    {
        path: 'last-minute-service-new',
        component: LastMinuteServicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bemApp.lastMinuteService.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'last-minute-service/:id/edit',
        component: LastMinuteServicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bemApp.lastMinuteService.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'last-minute-service/:id/delete',
        component: LastMinuteServiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bemApp.lastMinuteService.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
