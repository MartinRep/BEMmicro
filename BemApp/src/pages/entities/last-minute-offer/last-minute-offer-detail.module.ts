import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { LastMinuteOfferDetailPage } from './last-minute-offer-detail';
import { LastMinuteOfferService } from './last-minute-offer.provider';

@NgModule({
    declarations: [
        LastMinuteOfferDetailPage
    ],
    imports: [
        IonicPageModule.forChild(LastMinuteOfferDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        LastMinuteOfferDetailPage
    ],
    providers: [LastMinuteOfferService]
})
export class LastMinuteOfferDetailPageModule {
}
