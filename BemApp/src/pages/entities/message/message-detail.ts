import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { Message } from './message.model';
import { MessageService } from './message.provider';

@IonicPage({
    segment: 'message-detail/:id'
})
@Component({
    selector: 'page-message-detail',
    templateUrl: 'message-detail.html'
})
export class MessageDetailPage {
    message: Message;

    constructor(private modalCtrl: ModalController, private params: NavParams,
                private messageService: MessageService, private toastCtrl: ToastController) {
        this.message = new Message();
        this.message.id = params.get('id');
    }

    ionViewDidLoad() {
        this.messageService.find(this.message.id).subscribe(data => this.message = data);
    }

    open(item: Message) {
        let modal = this.modalCtrl.create('MessageDialogPage', {item: item});
        modal.onDidDismiss(message => {
            if (message) {
                this.messageService.update(message).subscribe(data => {
                    this.message = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Message updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }
}
