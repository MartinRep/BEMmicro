import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Message } from './message.model';
import { MessageService } from './message.provider';

@IonicPage()
@Component({
    selector: 'page-message',
    templateUrl: 'message.html'
})
export class MessagePage {
    messages: Message[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private messageService: MessageService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.messages = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.messageService.query().subscribe(
            (response) => {
                this.messages = response;
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

    trackId(index: number, item: Message) {
        return item.id;
    }

    open(slidingItem: any, item: Message) {
        let modal = this.modalCtrl.create('MessageDialogPage', {item: item});
        modal.onDidDismiss(message => {
            if (message) {
                if (message.id) {
                    this.messageService.update(message).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Message updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.messageService.create(message).subscribe(data => {
                        this.messages.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Message added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(message) {
        this.messageService.delete(message.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Message deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(message: Message) {
        this.navCtrl.push('MessageDetailPage', {id: message.id});
    }
}
