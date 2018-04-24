import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Profile } from './profile.model';
import { ProfileService } from './profile.provider';
import { User } from '../../../models/user.model';
import { User as UserService } from '../../../providers/user/user';
import { Location, LocationService } from '../location';
import { Appointment, AppointmentService } from '../appointment';

@IonicPage()
@Component({
    selector: 'page-profile-dialog',
    templateUrl: 'profile-dialog.html'
})
export class ProfileDialogPage {

    profile: Profile;
    users: User[];
    locations: Location[];
    appointments: Appointment[];
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private userService: UserService,
                private locationService: LocationService,
                private appointmentService: AppointmentService,
                private profileService: ProfileService) {
        this.profile = params.get('item');
        if (this.profile && this.profile.id) {
            this.profileService.find(this.profile.id).subscribe(data => {
                this.profile = data;
            });
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.profile.id : null],
            name: [params.get('item') ? this.profile.name : '', ],
            phNumber: [params.get('item') ? this.profile.phNumber : '', ],
            picture: [params.get('item') ? this.profile.picture : '', ],
            user: [params.get('item') ? this.profile.user : '',],
            location: [params.get('item') ? this.profile.location : '',],
            appointments: [params.get('item') ? this.profile.appointments : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });
    }

    ionViewDidLoad() {
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
        this.locationService.query()
            .subscribe(data => { this.locations = data; }, (error) => this.onError(error));
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
     * The user is done and wants to create the profile, so return it
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

    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
    compareLocation(first: Location, second: Location): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }
    compareAppointment(first: Appointment, second: Appointment): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackAppointmentById(index: number, item: Appointment) {
        return item.id;
    }
}
