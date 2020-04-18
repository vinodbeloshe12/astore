import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { imgUrl } from '../app.constants';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  products: any = [];
  imageUrl = imgUrl;
  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getAllProducts();
  }
  getAllProducts() {
    this.productService.getAllProducts().subscribe((res: any) => {
      this.products = res;
    })
  }

}
