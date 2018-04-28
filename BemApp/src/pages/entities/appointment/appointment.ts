import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Appointment } from './appointment.model';
import { AppointmentService } from './appointment.provider';

@IonicPage()
@Component({
    selector: 'page-appointment',
    templateUrl: 'appointment.html'
})
export class AppointmentPage {
    appointments: Appointment[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private appointmentService: AppointmentService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.appointments = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.appointmentService.query().subscribe(
            (response) => {
                this.appointments = response;
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

    trackId(index: number, item: Appointment) {
        return item.id;
    }

    open(slidingItem: any, item: Appointment) {
        let modal = this.modalCtrl.create('AppointmentDialogPage', {item: item});
        modal.onDidDismiss(appointment => {
            if (appointment) {
                if (appointment.id) {
                    this.appointmentService.update(appointment).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Appointment updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.appointmentService.create(appointment).subscribe(data => {
                        this.appointments.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Appointment added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(appointment) {
        this.appointmentService.delete(appointment.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Appointment deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(appointment: Appointment) {
        this.navCtrl.push('AppointmentDetailPage', {id: appointment.id});
    }
}
