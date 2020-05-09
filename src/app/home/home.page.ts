import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { imgUrl, isShowNotification } from '../app.constants';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  products: any = [];
  imageUrl = imgUrl;
  viewType: string = 'grid';
  constructor(private productService: ProductService, private cartService: CartService) {
  }

  ngOnInit() {
    this.getAllProducts();
    this.getCart();
  }
  getAllProducts() {
    this.productService.getAllProducts().subscribe((res: any) => {
      if (res.value) {
        this.products = res.data;
      }
    })
  }

  getCart() {
    let cartApiData = {
      language: 'ma',
      user_id: JSON.parse(localStorage.getItem("userData")).id
    }
    this.cartService.getCart(cartApiData).subscribe((res: any) => {
      if (res.value) {
        this.cartService.cartCount.emit(res.TotalItemsInCart);
      }
    })
  }


  addToCart(data) {
    let cartApiData = {
      user_id: JSON.parse(localStorage.getItem("userData")).id,
      quantity: 1,
      product_id: data.id
    }
    this.cartService.addToCart(cartApiData).subscribe((res: any) => {
      if (res.value) {
        isShowNotification.emit(res.message + data.name);
        this.cartService.cartCount.emit(res.TotalItemsInCart);
      }
    })
  }

}
