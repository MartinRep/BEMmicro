import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Profile } from './profile.model';
import { ProfileService } from './profile.provider';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {
    profiles: Profile[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private profileService: ProfileService, private dataUtils: JhiDataUtils,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.profiles = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.profileService.query().subscribe(
            (response) => {
                this.profiles = response;
                if (typeof(refresher) !== 'undefined') {
                    refresher.complete();
                }
            },
            (error) => {
                console.error(error);
                let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
                toast.present();
            });
    }

    trackId(index: number, item: Profile) {
        return item.id;
    }

    open(slidingItem: any, item: Profile) {
        let modal = this.modalCtrl.create('ProfileDialogPage', {item: item});
        modal.onDidDismiss(profile => {
            if (profile) {
                if (profile.id) {
                    this.profileService.update(profile).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Profile updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.profileService.create(profile).subscribe(data => {
                        this.profiles.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Profile added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(profile) {
        this.profileService.delete(profile.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Profile deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(profile: Profile) {
        this.navCtrl.push('ProfileDetailPage', {id: profile.id});
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }
}
