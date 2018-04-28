import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Appointment } from './appointment.model';
import { AppointmentService } from './appointment.provider';
import { Location, LocationService } from '../location';
import { Category, CategoryService } from '../category';
import { Profile, ProfileService } from '../profile';
import { Message, MessageService } from '../message';

@IonicPage()
@Component({
    selector: 'page-appointment-dialog',
    templateUrl: 'appointment-dialog.html'
})
export class AppointmentDialogPage {

    appointment: Appointment;
    locations: Location[];
    categories: Category[];
    profiles: Profile[];
    messages: Message[];
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private locationService: LocationService,
                private categoryService: CategoryService,
                private profileService: ProfileService,
                private messageService: MessageService,
                private appointmentService: AppointmentService) {
        this.appointment = params.get('item');
        if (this.appointment && this.appointment.id) {
            this.appointmentService.find(this.appointment.id).subscribe(data => {
                this.appointment = data;
            });
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.appointment.id : ''],
            name: [params.get('item') ? this.appointment.name : '', ],
            address: [params.get('item') ? this.appointment.address : '', ],
            time: [params.get('item') ? this.appointment.time : '', ],
            location: [params.get('item') ? this.appointment.location : '',],
            category: [params.get('item') ? this.appointment.category : '',],
            profiles: [params.get('item') ? this.appointment.profiles : '',],
            messages: [params.get('item') ? this.appointment.messages : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });
    }

    ionViewDidLoad() {
        this.locationService
            .query({filter: 'appointment-is-null'})
            .subscribe(data => {
                if (!this.appointment.location || !this.appointment.location.id) {
                    this.locations = data;
                } else {
                    this.locationService
                        .find(this.appointment.location.id)
                        .subscribe((subData: Location) => {
                            this.locations = [subData].concat(subData);
                        }, (error) => this.onError(error));
                }
            }, (error) => this.onError(error));
        this.categoryService.query()
            .subscribe(data => { this.categories = data; }, (error) => this.onError(error));
        this.profileService.query()
            .subscribe(data => { this.profiles = data; }, (error) => this.onError(error));
        this.messageService.query()
            .subscribe(data => { this.messages = data; }, (error) => this.onError(error));
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

    compareLocation(first: Location, second: Location): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }
    compareCategory(first: Category, second: Category): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackCategoryById(index: number, item: Category) {
        return item.id;
    }
    compareProfile(first: Profile, second: Profile): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackProfileById(index: number, item: Profile) {
        return item.id;
    }
    compareMessage(first: Message, second: Message): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackMessageById(index: number, item: Message) {
        return item.id;
    }
}
