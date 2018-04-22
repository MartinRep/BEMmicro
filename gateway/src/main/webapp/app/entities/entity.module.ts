import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BemProfileModule } from './profile/profile.module';
import { BemAppointmentModule } from './appointment/appointment.module';
import { BemMessageModule } from './message/message.module';
import { BemRequestModule } from './request/request.module';
import { BemOfferModule } from './offer/offer.module';
import { BemLastMinuteServiceModule } from './last-minute-service/last-minute-service.module';
import { BemLastMinuteOfferModule } from './last-minute-offer/last-minute-offer.module';
import { BemLocationModule } from './location/location.module';
import { BemCategoriesModule } from './categories/categories.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        BemProfileModule,
        BemAppointmentModule,
        BemMessageModule,
        BemRequestModule,
        BemOfferModule,
        BemLastMinuteServiceModule,
        BemLastMinuteOfferModule,
        BemLocationModule,
        BemCategoriesModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BemEntityModule {}
