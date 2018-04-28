import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestPage } from './request';
import { RequestService } from './request.provider';

@NgModule({
    declarations: [
        RequestPage
    ],
    imports: [
        IonicPageModule.forChild(RequestPage),
        TranslateModule.forChild()
    ],
    exports: [
        RequestPage
    ],
    providers: [RequestService]
})
export class RequestPageModule {
}
