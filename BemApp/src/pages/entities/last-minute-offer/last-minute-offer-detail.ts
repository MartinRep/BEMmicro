import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { LastMinuteOffer } from './last-minute-offer.model';
import { LastMinuteOfferService } from './last-minute-offer.provider';

@IonicPage({
    segment: 'last-minute-offer-detail/:id'
})
@Component({
    selector: 'page-last-minute-offer-detail',
    templateUrl: 'last-minute-offer-detail.html'
})
export class LastMinuteOfferDetailPage {
    lastMinuteOffer: LastMinuteOffer;

    constructor(private modalCtrl: ModalController, private params: NavParams,
                private lastMinuteOfferService: LastMinuteOfferService, private toastCtrl: ToastController) {
        this.lastMinuteOffer = new LastMinuteOffer();
        this.lastMinuteOffer.id = params.get('id');
    }

    ionViewDidLoad() {
        this.lastMinuteOfferService.find(this.lastMinuteOffer.id).subscribe(data => this.lastMinuteOffer = data);
    }

    open(item: LastMinuteOffer) {
        let modal = this.modalCtrl.create('LastMinuteOfferDialogPage', {item: item});
        modal.onDidDismiss(lastMinuteOffer => {
            if (lastMinuteOffer) {
                this.lastMinuteOfferService.update(lastMinuteOffer).subscribe(data => {
                    this.lastMinuteOffer = data;
                    let toast = this.toastCtrl.create(
                        {message: 'LastMinuteOffer updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }
}
