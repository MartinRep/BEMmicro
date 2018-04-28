import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { LastMinuteOffer } from './last-minute-offer.model';
import { LastMinuteOfferService } from './last-minute-offer.provider';

@IonicPage()
@Component({
    selector: 'page-last-minute-offer',
    templateUrl: 'last-minute-offer.html'
})
export class LastMinuteOfferPage {
    lastMinuteOffers: LastMinuteOffer[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private lastMinuteOfferService: LastMinuteOfferService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.lastMinuteOffers = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.lastMinuteOfferService.query().subscribe(
            (response) => {
                this.lastMinuteOffers = response;
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

    trackId(index: number, item: LastMinuteOffer) {
        return item.id;
    }

    open(slidingItem: any, item: LastMinuteOffer) {
        let modal = this.modalCtrl.create('LastMinuteOfferDialogPage', {item: item});
        modal.onDidDismiss(lastMinuteOffer => {
            if (lastMinuteOffer) {
                if (lastMinuteOffer.id) {
                    this.lastMinuteOfferService.update(lastMinuteOffer).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'LastMinuteOffer updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.lastMinuteOfferService.create(lastMinuteOffer).subscribe(data => {
                        this.lastMinuteOffers.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'LastMinuteOffer added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(lastMinuteOffer) {
        this.lastMinuteOfferService.delete(lastMinuteOffer.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'LastMinuteOffer deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(lastMinuteOffer: LastMinuteOffer) {
        this.navCtrl.push('LastMinuteOfferDetailPage', {id: lastMinuteOffer.id});
    }
}
