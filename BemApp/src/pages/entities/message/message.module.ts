import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagePage } from './message';
import { MessageService } from './message.provider';

@NgModule({
    declarations: [
        MessagePage
    ],
    imports: [
        IonicPageModule.forChild(MessagePage),
        TranslateModule.forChild()
    ],
    exports: [
        MessagePage
    ],
    providers: [MessageService]
})
export class MessagePageModule {
}
