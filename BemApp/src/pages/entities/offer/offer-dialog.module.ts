import { RequestService } from '../request';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferDialogPage } from './offer-dialog';
import { OfferService } from './offer.provider';

@NgModule({
    declarations: [
        OfferDialogPage
    ],
    imports: [
        IonicPageModule.forChild(OfferDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        OfferDialogPage
    ],
    providers: [
        OfferService,
        RequestService,
    ]
})
export class OfferDialogPageModule {
}
