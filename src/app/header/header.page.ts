import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { isShowHeader } from '../app.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {
  isMenuOpen: boolean = false;
  userData: any;
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  openMenu() {
    this.isMenuOpen = false;
    document.body.classList.remove('sidemenu-open', 'menuactive');
    isShowHeader.emit(true);
  }

  logout() {
    localStorage.clear();
    this.openMenu();
    isShowHeader.emit(false);
    this.navCtrl.navigateRoot('/login');
  }

}
