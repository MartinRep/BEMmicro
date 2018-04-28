import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { LastMinuteService } from './last-minute-service.model';
import { LastMinuteServiceService } from './last-minute-service.provider';

@IonicPage({
    segment: 'last-minute-service-detail/:id'
})
@Component({
    selector: 'page-last-minute-service-detail',
    templateUrl: 'last-minute-service-detail.html'
})
export class LastMinuteServiceDetailPage {
    lastMinuteService: LastMinuteService;

    constructor(private modalCtrl: ModalController, private params: NavParams,
                private lastMinuteServiceService: LastMinuteServiceService, private toastCtrl: ToastController) {
        this.lastMinuteService = new LastMinuteService();
        this.lastMinuteService.id = params.get('id');
    }

    ionViewDidLoad() {
        this.lastMinuteServiceService.find(this.lastMinuteService.id).subscribe(data => this.lastMinuteService = data);
    }

    open(item: LastMinuteService) {
        let modal = this.modalCtrl.create('LastMinuteServiceDialogPage', {item: item});
        modal.onDidDismiss(lastMinuteService => {
            if (lastMinuteService) {
                this.lastMinuteServiceService.update(lastMinuteService).subscribe(data => {
                    this.lastMinuteService = data;
                    let toast = this.toastCtrl.create(
                        {message: 'LastMinuteService updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }
}
