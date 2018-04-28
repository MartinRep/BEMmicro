import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Offer } from './offer.model';
import { OfferService } from './offer.provider';

@IonicPage()
@Component({
    selector: 'page-offer',
    templateUrl: 'offer.html'
})
export class OfferPage {
    offers: Offer[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private offerService: OfferService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.offers = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.offerService.query().subscribe(
            (response) => {
                this.offers = response;
                if (typeof(refresher) !== 'undefined') {
                    refresher.complete();
                }
            },
            (error) => {
                console.error(error);
                let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
                toast.present();
            });
    }

    trackId(index: number, item: Offer) {
        return item.id;
    }

    open(slidingItem: any, item: Offer) {
        let modal = this.modalCtrl.create('OfferDialogPage', {item: item});
        modal.onDidDismiss(offer => {
            if (offer) {
                if (offer.id) {
                    this.offerService.update(offer).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Offer updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.offerService.create(offer).subscribe(data => {
                        this.offers.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Offer added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(offer) {
        this.offerService.delete(offer.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Offer deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(offer: Offer) {
        this.navCtrl.push('OfferDetailPage', {id: offer.id});
    }
}
