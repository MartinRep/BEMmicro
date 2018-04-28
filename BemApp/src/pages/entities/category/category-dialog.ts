import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Category } from './category.model';
import { CategoryService } from './category.provider';

@IonicPage()
@Component({
    selector: 'page-category-dialog',
    templateUrl: 'category-dialog.html'
})
export class CategoryDialogPage {

    category: Category;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private categoryService: CategoryService) {
        this.category = params.get('item');
        if (this.category && this.category.id) {
            this.categoryService.find(this.category.id).subscribe(data => {
                this.category = data;
            });
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.category.id : ''],
            name: [params.get('item') ? this.category.name : '',  Validators.required],
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
     * The user is done and wants to create the category, so return it
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
