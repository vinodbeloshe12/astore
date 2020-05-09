import { Component, OnInit } from '@angular/core';
// import {
//   AuthService,
//   FacebookLoginProvider,
//   GoogleLoginProvider
// } from 'angular-6-social-login';
import { NavController } from '@ionic/angular';
import { isShowHeader } from '../app.constants';
import { UserService } from '../services/user.service';
import { isShowNotification } from '../app.constants';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  otpData: any = [
    {
      'name': 'one',
      'model': ''
    },
    {
      'name': 'two',
      'model': ''
    },
    {
      'name': 'three',
      'model': ''
    },
    {
      'name': 'four',
      'model': ''
    },
    {
      'name': 'five',
      'model': ''
    },
    {
      'name': 'six',
      'model': ''
    }
  ];
  loginSteps: number = 1;
  userData: any = { mobileno: '' };
  constructor(public navCtrl: NavController, private userService: UserService) { }

  ngOnInit() {

  }

  verifyOTP(data) {
    let otp = "";
    this.otpData.forEach(element => {
      otp += element.model;
    });
    let apiData = {
      mobileno: localStorage.getItem('mobileno'),
      password: otp
    };
    this.userService.checkOTP(apiData).subscribe((res: any) => {
      console.log("respo", res);
      if (res.value) {
        localStorage.setItem("userData", JSON.stringify(res.data));
        isShowHeader.emit(true);
        this.navCtrl.navigateRoot('/home');
      } else {
        console.log("invalid OTP");
        isShowNotification.emit('invalid OTP');
        this.otpData.forEach(element => {
          element.model = "";
        });
      }
    });
  }

  back() {
    this.otpData.forEach(element => {
      element.model = "";
    });
    this.loginSteps = 1;
  }
  login(userData) {
    if (userData.mobileno == '8082495670') {
      this.loginSteps++;
      localStorage.setItem("mobileno", userData.mobileno);
    } else {
      this.userService.createUser(userData).subscribe((res: any) => {
        if (res.value) {
          this.loginSteps++;
          localStorage.setItem("mobileno", userData.mobileno);
        }
      }, err => console.log(err));
    }
  }
  // public socialSignIn(socialPlatform: string) {
  //   let socialPlatformProvider;
  //   if (socialPlatform == "facebook") {
  //     socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  //   } else if (socialPlatform == "google") {
  //     socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  //   }

  //   this.socialAuthService.signIn(socialPlatformProvider).then(
  //     (userData) => {
  //       localStorage.setItem("userData", JSON.stringify(userData));
  //       isShowHeader.emit(true);
  //       this.navCtrl.navigateRoot('/home');
  //     }
  //   );
  // }

  nextTextBox(data, index) {
    if (data.length == 1) {
      if (index < 5) {
        document.getElementById(index + 1).focus();
      }
    }
  }

  onlyNumbers(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    // console.log(inputChar, e.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

}
