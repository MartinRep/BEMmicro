import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { Location } from './location.model';
import { LocationService } from './location.provider';

@IonicPage({
    segment: 'location-detail/:id'
})
@Component({
    selector: 'page-location-detail',
    templateUrl: 'location-detail.html'
})
export class LocationDetailPage {
    location: Location;

    constructor(private modalCtrl: ModalController, private params: NavParams,
                private locationService: LocationService, private toastCtrl: ToastController) {
        this.location = new Location();
        this.location.id = params.get('id');
    }

    ionViewDidLoad() {
        this.locationService.find(this.location.id).subscribe(data => this.location = data);
    }

    open(item: Location) {
        let modal = this.modalCtrl.create('LocationDialogPage', {item: item});
        modal.onDidDismiss(location => {
            if (location) {
                this.locationService.update(location).subscribe(data => {
                    this.location = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Location updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }
}
