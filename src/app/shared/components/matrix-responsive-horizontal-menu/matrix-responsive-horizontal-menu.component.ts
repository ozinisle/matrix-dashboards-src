import { Component, OnInit } from '@angular/core';
import { BaseMenuItemInterface } from '../../models/interfaces/base-menu-item.interface';
import { BaseMenuItemModal } from '../../models/base-menu-item.model';

@Component({
  selector: 'app-matrix-responsive-horizontal-menu',
  templateUrl: './matrix-responsive-horizontal-menu.component.html',
  styleUrls: ['./matrix-responsive-horizontal-menu.component.scss']
})
export class MatrixResponsiveHorizontalMenuComponent implements OnInit {
  public topMenuItems: BaseMenuItemInterface[] = [];

  private topMenuItemsConfig = [
    { 'name': 'Home', 'route': '' },
    { 'name': 'About Us', 'route': '' },
    { 'name': 'Products', 'route': '' },
    { 'name': 'Promotions', 'route': '' },
    { 'name': 'Whats New', 'route': '' },
    { 'name': 'Region wise', 'route': '' },
    { 'name': 'Guided Tour', 'route': '' },
    { 'name': 'Ethinic wear History', 'route': '' },
    { 'name': 'FAQs', 'route': '' },
    { 'name': 'Contact', 'route': '' }
  ];

  private selectedTopMenuItemIndex: number = 0;
  constructor() { }

  ngOnInit() {
    this.topMenuItemsConfig.map((menuItem) => {
      const topMenuItem: BaseMenuItemInterface = new BaseMenuItemModal();
      topMenuItem.setLabel(menuItem.name).setNavigationRouteUrl(menuItem.route);
      this.topMenuItems.push(topMenuItem);
    });
  }

  /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
  public myFunction() {
    const x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
      x.className += ' responsive';
    } else {
      x.className = 'topnav';
    }
  }

  public doClick(topMenuItem: BaseMenuItemInterface, menuItemIndex: number) {
    console.log('will navgate to ' + topMenuItem.navigationRouteUrl, 'you have selected the item : ' + menuItemIndex);
    this.selectedTopMenuItemIndex = menuItemIndex;
  }

  public getMenuItemClass(menuItemIndex) {
    // yet to code
    return this.selectedTopMenuItemIndex;
  }

}
