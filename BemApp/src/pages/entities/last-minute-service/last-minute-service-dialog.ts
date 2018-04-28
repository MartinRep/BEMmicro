import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { LastMinuteService } from './last-minute-service.model';
import { LastMinuteServiceService } from './last-minute-service.provider';

@IonicPage()
@Component({
    selector: 'page-last-minute-service-dialog',
    templateUrl: 'last-minute-service-dialog.html'
})
export class LastMinuteServiceDialogPage {

    lastMinuteService: LastMinuteService;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private lastMinuteServiceService: LastMinuteServiceService) {
        this.lastMinuteService = params.get('item');
        if (this.lastMinuteService && this.lastMinuteService.id) {
            this.lastMinuteServiceService.find(this.lastMinuteService.id).subscribe(data => {
                this.lastMinuteService = data;
            });
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.lastMinuteService.id : ''],
            category: [params.get('item') ? this.lastMinuteService.category : '',  Validators.required],
            description: [params.get('item') ? this.lastMinuteService.description : '',  Validators.required],
            available: [params.get('item') ? this.lastMinuteService.available : '', ],
            location: [params.get('item') ? this.lastMinuteService.location : '',  Validators.required],
            price: [params.get('item') ? this.lastMinuteService.price : '',  Validators.required],
            address: [params.get('item') ? this.lastMinuteService.address : '',  Validators.required],
            image: [params.get('item') ? this.lastMinuteService.image : '', ],
            profile: [params.get('item') ? this.lastMinuteService.profile : '', ],
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
     * The user is done and wants to create the last-minute-service, so return it
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
