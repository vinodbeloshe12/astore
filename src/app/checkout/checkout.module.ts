import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

import { WebIntent } from '@ionic-native/web-intent/ngx';
import { CheckoutPageRoutingModule } from './checkout-routing.module';
import { CheckoutPage } from './checkout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutPageRoutingModule
  ],
  providers: [
    // NativeGeocoder,
    // Geolocation
    WebIntent
  ],
  declarations: [CheckoutPage]
})
export class CheckoutPageModule { }
