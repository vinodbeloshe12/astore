import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})


export class CartPage implements OnInit {

  constructor(private socialSharing: SocialSharing) { }

  ngOnInit() {
  }




  // Share Via WhatsApp
  shareViaWhatsapp() {
    this.socialSharing.shareViaWhatsApp('शेंगदाणे 1 KG - ₹ 140.00\nतूर डाळ 1 KG - ₹94.00', null, 'https://google.com/')
      .then(() => {
        console.log('It works');
      }).catch(() => {
        alert('WhatsApp not available')
      });
  }

}
