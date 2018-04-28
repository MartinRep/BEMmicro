import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestDetailPage } from './request-detail';
import { RequestService } from './request.provider';

@NgModule({
    declarations: [
        RequestDetailPage
    ],
    imports: [
        IonicPageModule.forChild(RequestDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        RequestDetailPage
    ],
    providers: [RequestService]
})
export class RequestDetailPageModule {
}
