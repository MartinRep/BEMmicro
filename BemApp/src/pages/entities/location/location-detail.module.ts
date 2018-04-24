import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationDetailPage } from './location-detail';
import { LocationService } from './location.provider';

@NgModule({
    declarations: [
        LocationDetailPage
    ],
    imports: [
        IonicPageModule.forChild(LocationDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        LocationDetailPage
    ],
    providers: [LocationService]
})
export class LocationDetailPageModule {
}
