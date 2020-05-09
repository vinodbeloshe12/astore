import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';



// import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule
  ],
  providers: [
    // SocialSharing
  ],
  declarations: [CartPage]
})
export class CartPageModule { }
