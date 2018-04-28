import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationPage } from './location';
import { LocationService } from './location.provider';

@NgModule({
    declarations: [
        LocationPage
    ],
    imports: [
        IonicPageModule.forChild(LocationPage),
        TranslateModule.forChild()
    ],
    exports: [
        LocationPage
    ],
    providers: [LocationService]
})
export class LocationPageModule {
}
