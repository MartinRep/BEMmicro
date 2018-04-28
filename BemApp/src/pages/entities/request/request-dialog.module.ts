import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestDialogPage } from './request-dialog';
import { RequestService } from './request.provider';

@NgModule({
    declarations: [
        RequestDialogPage
    ],
    imports: [
        IonicPageModule.forChild(RequestDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        RequestDialogPage
    ],
    providers: [
        RequestService
    ]
})
export class RequestDialogPageModule {
}
