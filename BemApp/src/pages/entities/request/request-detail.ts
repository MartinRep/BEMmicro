import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { Request } from './request.model';
import { RequestService } from './request.provider';

@IonicPage({
    segment: 'request-detail/:id'
})
@Component({
    selector: 'page-request-detail',
    templateUrl: 'request-detail.html'
})
export class RequestDetailPage {
    request: Request;

    constructor(private modalCtrl: ModalController, private params: NavParams,
                private requestService: RequestService, private toastCtrl: ToastController) {
        this.request = new Request();
        this.request.id = params.get('id');
    }

    ionViewDidLoad() {
        this.requestService.find(this.request.id).subscribe(data => this.request = data);
    }

    open(item: Request) {
        let modal = this.modalCtrl.create('RequestDialogPage', {item: item});
        modal.onDidDismiss(request => {
            if (request) {
                this.requestService.update(request).subscribe(data => {
                    this.request = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Request updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }
}
