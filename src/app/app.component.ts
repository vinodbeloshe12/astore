import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { isShowHeader, isShowNotification } from './app.constants';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  isMenuOpen: boolean = false;
  isNotification: boolean = false;
  showLangDropdown: boolean = false;
  notificationMessage: string = '';
  menuImg = "assets/img/menu.png";
  selectedMenu = "home";
  showHeader: boolean = false;
  cartCount: number = 0;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public navCtrl: NavController,
    private cartService: CartService
  ) {
    this.initializeApp();
    if (!localStorage.getItem('userData')) {
      this.navCtrl.navigateRoot('/login');
    } else {
      this.showHeader = true;
      this.getCart();
    }
    isShowHeader.subscribe((value) => {
      this.showHeader = value;
      this.isMenuOpen = false;
      this.menuImg = "assets/img/menu.png";
    })
    isShowNotification.subscribe((value) => {
      console.log("value", value)
      this.isNotification = true;
      this.notificationMessage = value;
      setTimeout(() => {
        this.isNotification = false;
      }, 3000);
    })

    //get cart count
    this.cartService.cartCount.subscribe((data: any) => {
      if (data) {
        this.cartCount = data;
      } else {
        this.cartCount = 0;
      }
    })
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.classList.add('sidemenu-open', 'menuactive');
      this.menuImg = "assets/img/close.png";
    } else {
      document.body.classList.remove('sidemenu-open', 'menuactive');
      this.menuImg = "assets/img/menu.png";
    }
  }

  changeRoute(val) {
    console.log("val", val);
    this.navCtrl.navigateRoot('/' + val);
    // this.router.navigate['/' + val];
    this.selectedMenu = val;
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

  ngAfterViewInit() {
    const ement: any = document.getElementsByClassName('ng-spinner');
    if (ement && ement[0] && ement[0].style) {
      ement[0].style.backgroundImage = 'url(assets/img/loader.png)';
      ement[0].style.width = "150px";
    }
  }


  openLanguage() {
    this.showLangDropdown = !this.showLangDropdown;
  }

  changeLanguage(val) {
    localStorage.setItem('language', JSON.stringify(val));
    location.reload();
  }

}
