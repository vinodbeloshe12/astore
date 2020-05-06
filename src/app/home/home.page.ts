import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { imgUrl } from '../app.constants';
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
  }
  getAllProducts() {
    this.productService.getAllProducts().subscribe((res: any) => {
      if (res.value) {
        this.products = res.data;
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
        console.log("product added to the cart");
        this.cartService.cartCount.emit(res.TotalItemsInCart);
      }
    })
  }

}
