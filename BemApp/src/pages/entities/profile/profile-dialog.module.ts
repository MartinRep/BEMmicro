import { User as UserService } from '../../../providers/user/user';
import { LocationService } from '../location';
import { AppointmentService } from '../appointment';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileDialogPage } from './profile-dialog';
import { ProfileService } from './profile.provider';

@NgModule({
    declarations: [
        ProfileDialogPage
    ],
    imports: [
        IonicPageModule.forChild(ProfileDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        ProfileDialogPage
    ],
    providers: [
        ProfileService,
        UserService,
        LocationService,
        AppointmentService,
    ]
})
export class ProfileDialogPageModule {
}
