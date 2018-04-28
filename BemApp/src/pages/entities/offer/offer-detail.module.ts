import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferDetailPage } from './offer-detail';
import { OfferService } from './offer.provider';

@NgModule({
    declarations: [
        OfferDetailPage
    ],
    imports: [
        IonicPageModule.forChild(OfferDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        OfferDetailPage
    ],
    providers: [OfferService]
})
export class OfferDetailPageModule {
}
