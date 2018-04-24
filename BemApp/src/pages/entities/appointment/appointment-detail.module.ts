import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentDetailPage } from './appointment-detail';
import { AppointmentService } from './appointment.provider';

@NgModule({
    declarations: [
        AppointmentDetailPage
    ],
    imports: [
        IonicPageModule.forChild(AppointmentDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        AppointmentDetailPage
    ],
    providers: [AppointmentService]
})
export class AppointmentDetailPageModule {
}
