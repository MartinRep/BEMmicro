import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageDetailPage } from './message-detail';
import { MessageService } from './message.provider';

@NgModule({
    declarations: [
        MessageDetailPage
    ],
    imports: [
        IonicPageModule.forChild(MessageDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        MessageDetailPage
    ],
    providers: [MessageService]
})
export class MessageDetailPageModule {
}
