import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  products = [
    {
      "name_marathi": "तूर डाळ",
      "image": "toordal.png",
      "name_hindi": "Toor Dal",
      "price": "98"
    },
    {
      "name_marathi": "मूग डाळ",
      "name_hindi": "Moong Dal",
      "image": "moogdal.png",
      "price": "90"
    },
    {
      "name_marathi": "साखर",
      "name_hindi": "Sugar",
      "image": "sakhar.png",
      "price": "40"
    },
    {
      "name_marathi": "शेंगदाणे",
      "name_hindi": "Ground nut",
      "image": "shegdane.png",
      "price": "140"
    }
  ]
  constructor() { }



}
