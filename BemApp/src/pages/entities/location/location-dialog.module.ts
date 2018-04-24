import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationDialogPage } from './location-dialog';
import { LocationService } from './location.provider';

@NgModule({
    declarations: [
        LocationDialogPage
    ],
    imports: [
        IonicPageModule.forChild(LocationDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        LocationDialogPage
    ],
    providers: [
        LocationService
    ]
})
export class LocationDialogPageModule {
}
