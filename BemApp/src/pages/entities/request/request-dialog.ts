import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Request } from './request.model';
import { RequestService } from './request.provider';

@IonicPage()
@Component({
    selector: 'page-request-dialog',
    templateUrl: 'request-dialog.html'
})
export class RequestDialogPage {

    request: Request;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private requestService: RequestService) {
        this.request = params.get('item');
        if (this.request && this.request.id) {
            this.requestService.find(this.request.id).subscribe(data => {
                this.request = data;
            });
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.request.id : ''],
            category: [params.get('item') ? this.request.category : '',  Validators.required],
            region: [params.get('item') ? this.request.region : '',  Validators.required],
            description: [params.get('item') ? this.request.description : '',  Validators.required],
            duration: [params.get('item') ? this.request.duration : '', ],
            expPrice: [params.get('item') ? this.request.expPrice : '', ],
            image: [params.get('item') ? this.request.image : '', ],
            profile: [params.get('item') ? this.request.profile : '',  Validators.required],
            posted: [params.get('item') ? this.request.posted : '', ],
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
     * The user is done and wants to create the request, so return it
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
