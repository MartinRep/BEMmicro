import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { LastMinuteOfferPage } from './last-minute-offer';
import { LastMinuteOfferService } from './last-minute-offer.provider';

@NgModule({
    declarations: [
        LastMinuteOfferPage
    ],
    imports: [
        IonicPageModule.forChild(LastMinuteOfferPage),
        TranslateModule.forChild()
    ],
    exports: [
        LastMinuteOfferPage
    ],
    providers: [LastMinuteOfferService]
})
export class LastMinuteOfferPageModule {
}
