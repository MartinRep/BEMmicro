import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Message } from './message.model';
import { MessageService } from './message.provider';
import { Appointment, AppointmentService } from '../appointment';

@IonicPage()
@Component({
    selector: 'page-message-dialog',
    templateUrl: 'message-dialog.html'
})
export class MessageDialogPage {

    message: Message;
    appointments: Appointment[];
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private appointmentService: AppointmentService,
                private messageService: MessageService) {
        this.message = params.get('item');
        if (this.message && this.message.id) {
            this.messageService.find(this.message.id).subscribe(data => {
                this.message = data;
            });
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.message.id : ''],
            time: [params.get('item') ? this.message.time : '', ],
            content: [params.get('item') ? this.message.content : '',  Validators.required],
            appointments: [params.get('item') ? this.message.appointments : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });
    }

    ionViewDidLoad() {
        this.appointmentService.query()
            .subscribe(data => { this.appointments = data; }, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the message, so return it
     * back to the presenter.
     */
    done() {
        if (!this.form.valid) { return; }
        this.viewCtrl.dismiss(this.form.value);
    }

    onError(error) {
        console.error(error);
        let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
        toast.present();
    }

    compareAppointment(first: Appointment, second: Appointment): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackAppointmentById(index: number, item: Appointment) {
        return item.id;
    }
}
