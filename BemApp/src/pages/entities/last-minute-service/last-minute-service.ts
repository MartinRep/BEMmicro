import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { LastMinuteService } from './last-minute-service.model';
import { LastMinuteServiceService } from './last-minute-service.provider';

@IonicPage()
@Component({
    selector: 'page-last-minute-service',
    templateUrl: 'last-minute-service.html'
})
export class LastMinuteServicePage {
    lastMinuteServices: LastMinuteService[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private lastMinuteServiceService: LastMinuteServiceService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.lastMinuteServices = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.lastMinuteServiceService.query().subscribe(
            (response) => {
                this.lastMinuteServices = response;
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

    trackId(index: number, item: LastMinuteService) {
        return item.id;
    }

    open(slidingItem: any, item: LastMinuteService) {
        let modal = this.modalCtrl.create('LastMinuteServiceDialogPage', {item: item});
        modal.onDidDismiss(lastMinuteService => {
            if (lastMinuteService) {
                if (lastMinuteService.id) {
                    this.lastMinuteServiceService.update(lastMinuteService).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'LastMinuteService updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.lastMinuteServiceService.create(lastMinuteService).subscribe(data => {
                        this.lastMinuteServices.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'LastMinuteService added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(lastMinuteService) {
        this.lastMinuteServiceService.delete(lastMinuteService.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'LastMinuteService deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(lastMinuteService: LastMinuteService) {
        this.navCtrl.push('LastMinuteServiceDetailPage', {id: lastMinuteService.id});
    }
}
