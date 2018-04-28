import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { LastMinuteServicePage } from './last-minute-service';
import { LastMinuteServiceService } from './last-minute-service.provider';

@NgModule({
    declarations: [
        LastMinuteServicePage
    ],
    imports: [
        IonicPageModule.forChild(LastMinuteServicePage),
        TranslateModule.forChild()
    ],
    exports: [
        LastMinuteServicePage
    ],
    providers: [LastMinuteServiceService]
})
export class LastMinuteServicePageModule {
}
