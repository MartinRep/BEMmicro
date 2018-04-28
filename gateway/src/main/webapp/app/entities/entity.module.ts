import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayProfileModule } from './profile/profile.module';
import { GatewayAppointmentModule } from './appointment/appointment.module';
import { GatewayMessageModule } from './message/message.module';
import { GatewayCategoryModule } from './category/category.module';
import { GatewayLocationModule } from './location/location.module';
import { GatewayRequestModule } from './request/request.module';
import { GatewayOfferModule } from './offer/offer.module';
import { GatewayLastMinuteServiceModule } from './last-minute-service/last-minute-service.module';
import { GatewayLastMinuteOfferModule } from './last-minute-offer/last-minute-offer.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewayProfileModule,
        GatewayAppointmentModule,
        GatewayMessageModule,
        GatewayCategoryModule,
        GatewayLocationModule,
        GatewayRequestModule,
        GatewayOfferModule,
        GatewayLastMinuteServiceModule,
        GatewayLastMinuteOfferModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
