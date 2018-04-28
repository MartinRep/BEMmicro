import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { LastMinuteOffer } from './last-minute-offer.model';
import { LastMinuteOfferService } from './last-minute-offer.provider';
import { LastMinuteService, LastMinuteServiceService } from '../last-minute-service';

@IonicPage()
@Component({
    selector: 'page-last-minute-offer-dialog',
    templateUrl: 'last-minute-offer-dialog.html'
})
export class LastMinuteOfferDialogPage {

    lastMinuteOffer: LastMinuteOffer;
    lastminuteservices: LastMinuteService[];
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private lastMinuteServiceService: LastMinuteServiceService,
                private lastMinuteOfferService: LastMinuteOfferService) {
        this.lastMinuteOffer = params.get('item');
        if (this.lastMinuteOffer && this.lastMinuteOffer.id) {
            this.lastMinuteOfferService.find(this.lastMinuteOffer.id).subscribe(data => {
                this.lastMinuteOffer = data;
            });
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.lastMinuteOffer.id : ''],
            name: [params.get('item') ? this.lastMinuteOffer.name : '', ],
            profile: [params.get('item') ? this.lastMinuteOffer.profile : '', ],
            lastMinuteService: [params.get('item') ? this.lastMinuteOffer.lastMinuteService : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });
    }

    ionViewDidLoad() {
        this.lastMinuteServiceService.query()
            .subscribe(data => { this.lastminuteservices = data; }, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the last-minute-offer, so return it
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

    compareLastMinuteService(first: LastMinuteService, second: LastMinuteService): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackLastMinuteServiceById(index: number, item: LastMinuteService) {
        return item.id;
    }
}
