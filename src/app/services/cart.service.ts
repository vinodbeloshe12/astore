import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl, httpOptionsPost } from '../app.constants';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartCount = new EventEmitter<any>();
  constructor(private http: HttpClient) { }

  addToCart(data) {
    return this.http.post(apiUrl + 'addToCart', JSON.stringify(data));
  }
  getCart(data) {
    return this.http.post(apiUrl + 'getCart', JSON.stringify(data));
  }
  deleteCart(data) {
    return this.http.post(apiUrl + 'deleteCart', JSON.stringify(data));
  }
}
