import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Location } from './location.model';
import { LocationService } from './location.provider';

@IonicPage()
@Component({
    selector: 'page-location',
    templateUrl: 'location.html'
})
export class LocationPage {
    locations: Location[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private locationService: LocationService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.locations = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.locationService.query().subscribe(
            (response) => {
                this.locations = response;
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

    trackId(index: number, item: Location) {
        return item.id;
    }

    open(slidingItem: any, item: Location) {
        let modal = this.modalCtrl.create('LocationDialogPage', {item: item});
        modal.onDidDismiss(location => {
            if (location) {
                if (location.id) {
                    this.locationService.update(location).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Location updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.locationService.create(location).subscribe(data => {
                        this.locations.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Location added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(location) {
        this.locationService.delete(location.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Location deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(location: Location) {
        this.navCtrl.push('LocationDetailPage', {id: location.id});
    }
}
