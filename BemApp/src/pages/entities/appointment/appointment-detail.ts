import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { Appointment } from './appointment.model';
import { AppointmentService } from './appointment.provider';

@IonicPage({
    segment: 'appointment-detail/:id'
})
@Component({
    selector: 'page-appointment-detail',
    templateUrl: 'appointment-detail.html'
})
export class AppointmentDetailPage {
    appointment: Appointment;

    constructor(private modalCtrl: ModalController, params: NavParams,
                private appointmentService: AppointmentService, private toastCtrl: ToastController) {
        this.appointment = new Appointment();
        this.appointment.id = params.get('id');
    }

    ionViewDidLoad() {
        this.appointmentService.find(this.appointment.id).subscribe(data => this.appointment = data);
    }

    open(item: Appointment) {
        let modal = this.modalCtrl.create('AppointmentDialogPage', {item: item});
        modal.onDidDismiss(appointment => {
            if (appointment) {
                this.appointmentService.update(appointment).subscribe(data => {
                    this.appointment = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Appointment updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }
}
