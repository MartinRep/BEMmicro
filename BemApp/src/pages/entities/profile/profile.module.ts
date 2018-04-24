import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { ProfileService } from './profile.provider';

@NgModule({
    declarations: [
        ProfilePage
    ],
    imports: [
        IonicPageModule.forChild(ProfilePage),
        TranslateModule.forChild()
    ],
    exports: [
        ProfilePage
    ],
    providers: [ProfileService]
})
export class ProfilePageModule {
}
