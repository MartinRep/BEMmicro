import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentPage } from './appointment';
import { AppointmentService } from './appointment.provider';

@NgModule({
    declarations: [
        AppointmentPage
    ],
    imports: [
        IonicPageModule.forChild(AppointmentPage),
        TranslateModule.forChild()
    ],
    exports: [
        AppointmentPage
    ],
    providers: [AppointmentService]
})
export class AppointmentPageModule {
}
