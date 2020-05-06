import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CartService } from '../services/cart.service';
import { imgUrl } from '../app.constants';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})


export class CartPage implements OnInit {
  cartData: any = [];
  cartItems: number = 0;
  imageUrl = imgUrl;
  cartTotal: any = 0;
  deliveryCharge: any = 0;
  netAmount: any = 0;

  constructor(private socialSharing: SocialSharing, private cartService: CartService) { }

  ngOnInit() {
    this.getCart();
  }

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

  //remove cart item
  remove(data) {
    console.log("remove", data);
    let cartApiData = {
      user_id: JSON.parse(localStorage.getItem("userData")).id,
      id: data.product_id
    }
    this.cartService.deleteCart(cartApiData).subscribe((res: any) => {
      if (res.value) {
        console.log("product removed from cart");
        this.cartService.cartCount.emit(res.TotalItemsInCart);
        this.getCart();
      }
    })
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
