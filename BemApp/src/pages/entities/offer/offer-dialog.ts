import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Offer } from './offer.model';
import { OfferService } from './offer.provider';
import { Request, RequestService } from '../request';

@IonicPage()
@Component({
    selector: 'page-offer-dialog',
    templateUrl: 'offer-dialog.html'
})
export class OfferDialogPage {

    offer: Offer;
    requests: Request[];
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private requestService: RequestService,
                private offerService: OfferService) {
        this.offer = params.get('item');
        if (this.offer && this.offer.id) {
            this.offerService.find(this.offer.id).subscribe(data => {
                this.offer = data;
            });
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.offer.id : ''],
            description: [params.get('item') ? this.offer.description : '',  Validators.required],
            availableOn: [params.get('item') ? this.offer.availableOn : '', ],
            price: [params.get('item') ? this.offer.price : '', ],
            profile: [params.get('item') ? this.offer.profile : '',  Validators.required],
            request: [params.get('item') ? this.offer.request : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });
    }

    ionViewDidLoad() {
        this.requestService.query()
            .subscribe(data => { this.requests = data; }, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the offer, so return it
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

    compareRequest(first: Request, second: Request): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackRequestById(index: number, item: Request) {
        return item.id;
    }
}
