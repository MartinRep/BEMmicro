import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Location } from './location.model';
import { LocationService } from './location.provider';

@IonicPage()
@Component({
    selector: 'page-location-dialog',
    templateUrl: 'location-dialog.html'
})
export class LocationDialogPage {

    location: Location;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private locationService: LocationService) {
        this.location = params.get('item');
        if (this.location && this.location.id) {
            this.locationService.find(this.location.id).subscribe(data => {
                this.location = data;
            });
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.location.id : ''],
            region: [params.get('item') ? this.location.region : '',  Validators.required],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });
    }

    ionViewDidLoad() {
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the location, so return it
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

}
