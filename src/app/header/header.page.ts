import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {
  isMenuOpen: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  openMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.classList.add('sidemenu-open', 'menuactive');
    } else {
      document.body.classList.remove('sidemenu-open', 'menuactive');
    }
  }

}
