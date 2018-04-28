import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { Offer } from './offer.model';
import { OfferService } from './offer.provider';

@IonicPage({
    segment: 'offer-detail/:id'
})
@Component({
    selector: 'page-offer-detail',
    templateUrl: 'offer-detail.html'
})
export class OfferDetailPage {
    offer: Offer;

    constructor(private modalCtrl: ModalController, private params: NavParams,
                private offerService: OfferService, private toastCtrl: ToastController) {
        this.offer = new Offer();
        this.offer.id = params.get('id');
    }

    ionViewDidLoad() {
        this.offerService.find(this.offer.id).subscribe(data => this.offer = data);
    }

    open(item: Offer) {
        let modal = this.modalCtrl.create('OfferDialogPage', {item: item});
        modal.onDidDismiss(offer => {
            if (offer) {
                this.offerService.update(offer).subscribe(data => {
                    this.offer = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Offer updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }
}
