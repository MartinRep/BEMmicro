import { LastMinuteServiceService } from '../last-minute-service';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { LastMinuteOfferDialogPage } from './last-minute-offer-dialog';
import { LastMinuteOfferService } from './last-minute-offer.provider';

@NgModule({
    declarations: [
        LastMinuteOfferDialogPage
    ],
    imports: [
        IonicPageModule.forChild(LastMinuteOfferDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        LastMinuteOfferDialogPage
    ],
    providers: [
        LastMinuteOfferService,
        LastMinuteServiceService,
    ]
})
export class LastMinuteOfferDialogPageModule {
}
