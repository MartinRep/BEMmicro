import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { LastMinuteService } from './last-minute-service.model';
import { LastMinuteServiceService } from './last-minute-service.service';

@Injectable()
export class LastMinuteServicePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private lastMinuteServiceService: LastMinuteServiceService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.lastMinuteServiceService.find(id)
                    .subscribe((lastMinuteServiceResponse: HttpResponse<LastMinuteService>) => {
                        const lastMinuteService: LastMinuteService = lastMinuteServiceResponse.body;
                        lastMinuteService.available = this.datePipe
                            .transform(lastMinuteService.available, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.lastMinuteServiceModalRef(component, lastMinuteService);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.lastMinuteServiceModalRef(component, new LastMinuteService());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    lastMinuteServiceModalRef(component: Component, lastMinuteService: LastMinuteService): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.lastMinuteService = lastMinuteService;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
