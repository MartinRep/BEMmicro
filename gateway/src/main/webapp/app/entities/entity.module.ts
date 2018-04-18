import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BemProfileModule } from './profile/profile.module';
import { BemAppointmentModule } from './appointment/appointment.module';
import { BemMessageModule } from './message/message.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        BemProfileModule,
        BemAppointmentModule,
        BemMessageModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BemEntityModule {}
