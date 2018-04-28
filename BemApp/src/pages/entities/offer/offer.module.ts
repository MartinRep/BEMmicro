import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferPage } from './offer';
import { OfferService } from './offer.provider';

@NgModule({
    declarations: [
        OfferPage
    ],
    imports: [
        IonicPageModule.forChild(OfferPage),
        TranslateModule.forChild()
    ],
    exports: [
        OfferPage
    ],
    providers: [OfferService]
})
export class OfferPageModule {
}
