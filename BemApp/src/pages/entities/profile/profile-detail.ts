import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { Profile } from './profile.model';
import { ProfileService } from './profile.provider';

@IonicPage({
    segment: 'profile-detail/:id'
})
@Component({
    selector: 'page-profile-detail',
    templateUrl: 'profile-detail.html'
})
export class ProfileDetailPage {
    profile: Profile;

    constructor(private modalCtrl: ModalController, params: NavParams,
                private profileService: ProfileService, private toastCtrl: ToastController) {
        this.profile = new Profile();
        this.profile.id = params.get('id');
    }

    ionViewDidLoad() {
        this.profileService.find(this.profile.id).subscribe(data => this.profile = data);
    }

    open(item: Profile) {
        let modal = this.modalCtrl.create('ProfileDialogPage', {item: item});
        modal.onDidDismiss(profile => {
            if (profile) {
                this.profileService.update(profile).subscribe(data => {
                    this.profile = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Profile updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }
}
