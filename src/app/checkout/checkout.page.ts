import { Component, OnInit } from '@angular/core';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  userAdress: any = {};
  userData = JSON.parse(localStorage.getItem('userData'));
  cartData: any = [];
  cartItems: number = 0;
  cartTotal: any = 0;
  deliveryCharge: any = 0;
  netAmount: any = 0;
  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    // this.getLocation();
    this.getCart();
  }

  // getLocation() {
  //   let options: NativeGeocoderOptions = {
  //     useLocale: true,
  //     maxResults: 5
  //   };
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     console.log("resp", resp)
  //     console.log("lat" + resp.coords.latitude + " long" + resp.coords.longitude);
  //     this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
  //       .then((result: NativeGeocoderResult[]) => {
  //         console.log(JSON.stringify(result[0]));
  //         this.userAdress = result[0];
  //       })
  //       .catch((error: any) => console.log(error));

  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //   });
  // }


  //get cart items
  getCart() {
    this.cartTotal = 0;
    let cartApiData = {
      language: 'ma',
      user_id: JSON.parse(localStorage.getItem("userData")).id
    }
    this.cartService.getCart(cartApiData).subscribe((res: any) => {
      if (res.value) {
        this.cartData = res.data;
        this.cartData.forEach(cartItem => {
          this.cartTotal = this.cartTotal + (cartItem.price * cartItem.quantity);
        });
        this.cartItems = res.TotalItemsInCart;
        this.cartService.cartCount.emit(this.cartItems);
        if (this.cartTotal < 500 && this.cartTotal != 0) {
          this.deliveryCharge = 30;
        } else {
          this.deliveryCharge = 0;
        }
      }
    })
  }


}
