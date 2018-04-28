import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Request } from './request.model';
import { RequestService } from './request.provider';

@IonicPage()
@Component({
    selector: 'page-request',
    templateUrl: 'request.html'
})
export class RequestPage {
    requests: Request[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private requestService: RequestService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.requests = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.requestService.query().subscribe(
            (response) => {
                this.requests = response;
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

    trackId(index: number, item: Request) {
        return item.id;
    }

    open(slidingItem: any, item: Request) {
        let modal = this.modalCtrl.create('RequestDialogPage', {item: item});
        modal.onDidDismiss(request => {
            if (request) {
                if (request.id) {
                    this.requestService.update(request).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Request updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.requestService.create(request).subscribe(data => {
                        this.requests.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Request added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(request) {
        this.requestService.delete(request.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Request deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(request: Request) {
        this.navCtrl.push('RequestDetailPage', {id: request.id});
    }
}
