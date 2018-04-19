import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { LastMinuteOffer } from './last-minute-offer.model';
import { LastMinuteOfferService } from './last-minute-offer.service';

@Injectable()
export class LastMinuteOfferPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private lastMinuteOfferService: LastMinuteOfferService

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
                this.lastMinuteOfferService.find(id)
                    .subscribe((lastMinuteOfferResponse: HttpResponse<LastMinuteOffer>) => {
                        const lastMinuteOffer: LastMinuteOffer = lastMinuteOfferResponse.body;
                        this.ngbModalRef = this.lastMinuteOfferModalRef(component, lastMinuteOffer);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.lastMinuteOfferModalRef(component, new LastMinuteOffer());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    lastMinuteOfferModalRef(component: Component, lastMinuteOffer: LastMinuteOffer): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.lastMinuteOffer = lastMinuteOffer;
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
