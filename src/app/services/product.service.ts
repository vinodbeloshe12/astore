import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  language = localStorage.getItem('language') ? JSON.parse(localStorage.getItem('language')) : 'ma';
  constructor(private http: HttpClient) { }

  public getAllProducts() {
    let data = { 'language': this.language };
    return this.http.post(apiUrl + "getAllProducts", JSON.stringify(data));
  }
}
