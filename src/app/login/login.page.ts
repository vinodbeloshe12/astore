import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { NavController } from '@ionic/angular';
import { isShowHeader } from '../app.constants';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  otpData: any = {};
  loginSteps: number = 2;
  userData: any = { mobileno: '' };
  constructor(private socialAuthService: AuthService, public navCtrl: NavController, private userService: UserService) { }

  ngOnInit() {

  }

  login(userData) {
    this.userService.createUser(userData).subscribe((res: any) => {
      if (res.value) {
        console.log("respo", res);
        this.loginSteps++;
        // localStorage.setItem("userData", JSON.stringify(userData));
        // isShowHeader.emit(true);
        // this.navCtrl.navigateRoot('/home');
      }
    }, err => console.log(err));
  }
  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        localStorage.setItem("userData", JSON.stringify(userData));
        isShowHeader.emit(true);
        this.navCtrl.navigateRoot('/home');
      }
    );
  }

}
