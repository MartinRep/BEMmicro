import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { LastMinuteServiceDetailPage } from './last-minute-service-detail';
import { LastMinuteServiceService } from './last-minute-service.provider';

@NgModule({
    declarations: [
        LastMinuteServiceDetailPage
    ],
    imports: [
        IonicPageModule.forChild(LastMinuteServiceDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        LastMinuteServiceDetailPage
    ],
    providers: [LastMinuteServiceService]
})
export class LastMinuteServiceDetailPageModule {
}
