import { LocationService } from '../location';
import { CategoryService } from '../category';
import { ProfileService } from '../profile';
import { MessageService } from '../message';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentDialogPage } from './appointment-dialog';
import { AppointmentService } from './appointment.provider';

@NgModule({
    declarations: [
        AppointmentDialogPage
    ],
    imports: [
        IonicPageModule.forChild(AppointmentDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        AppointmentDialogPage
    ],
    providers: [
        AppointmentService,
        LocationService,
        CategoryService,
        ProfileService,
        MessageService,
    ]
})
export class AppointmentDialogPageModule {
}
