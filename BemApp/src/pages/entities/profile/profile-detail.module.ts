import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileDetailPage } from './profile-detail';
import { ProfileService } from './profile.provider';

@NgModule({
    declarations: [
        ProfileDetailPage
    ],
    imports: [
        IonicPageModule.forChild(ProfileDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        ProfileDetailPage
    ],
    providers: [ProfileService]
})
export class ProfileDetailPageModule {
}
