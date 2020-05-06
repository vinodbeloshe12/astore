import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  userAdress: any = {};
  userData = JSON.parse(localStorage.getItem('userData'));
  constructor(private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder) { }

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log("resp", resp)
      console.log("lat" + resp.coords.latitude + " long" + resp.coords.longitude);
      this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
        .then((result: NativeGeocoderResult[]) => {
          console.log(JSON.stringify(result[0]));
          this.userAdress = result[0];
        })
        .catch((error: any) => console.log(error));

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
