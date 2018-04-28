import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { LastMinuteServiceDialogPage } from './last-minute-service-dialog';
import { LastMinuteServiceService } from './last-minute-service.provider';

@NgModule({
    declarations: [
        LastMinuteServiceDialogPage
    ],
    imports: [
        IonicPageModule.forChild(LastMinuteServiceDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        LastMinuteServiceDialogPage
    ],
    providers: [
        LastMinuteServiceService
    ]
})
export class LastMinuteServiceDialogPageModule {
}
