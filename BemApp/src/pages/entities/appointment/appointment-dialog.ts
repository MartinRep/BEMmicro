import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Appointment } from './appointment.model';
import { AppointmentService } from './appointment.provider';
import { Profile, ProfileService } from '../profile';

@IonicPage()
@Component({
    selector: 'page-appointment-dialog',
    templateUrl: 'appointment-dialog.html'
})
export class AppointmentDialogPage {

    appointment: Appointment;
    profiles: Profile[];
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private profileService: ProfileService,
                private appointmentService: AppointmentService) {
        this.appointment = params.get('item');
        if (this.appointment && this.appointment.id) {
            this.appointmentService.find(this.appointment.id).subscribe(data => {
                this.appointment = data;
            });
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.appointment.id : null],
            name: [params.get('item') ? this.appointment.name : '', ],
            address: [params.get('item') ? this.appointment.address : '', ],
            time: [params.get('item') ? this.appointment.time : '', ],
            profiles: [params.get('item') ? this.appointment.profiles : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });
    }

    ionViewDidLoad() {
        this.profileService.query()
            .subscribe(data => { this.profiles = data; }, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the appointment, so return it
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

    compareProfile(first: Profile, second: Profile): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackProfileById(index: number, item: Profile) {
        return item.id;
    }
}
