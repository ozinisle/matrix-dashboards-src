import { Component, OnInit } from '@angular/core';
import { BaseMenuItemInterface } from 'src/app/shared/models/interfaces/base-menu-item.interface';
import { Router } from '@angular/router';
import { BaseMenuItemModal } from 'src/app/shared/models/base-menu-item.model';
import { MatrixConstants } from 'src/app/shared/constants/matrix.constants';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public links: BaseMenuItemInterface[] = [];

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.links.push((new BaseMenuItemModal()).setLabel('Contacts')
      .setNavigationRouteUrl(MatrixConstants.route.contacts));
    this.links.push((new BaseMenuItemModal()).setLabel('Moi')
      .setNavigationRouteUrl(MatrixConstants.route.moi));
    this.links.push((new BaseMenuItemModal()).setLabel('Quote to Memory')
      .setNavigationRouteUrl(MatrixConstants.route.memoryQuotes));
    this.links.push((new BaseMenuItemModal()).setLabel('POCs')
      .setNavigationRouteUrl(MatrixConstants.route.poc));
  }

  public openModule(link: BaseMenuItemInterface): void {
    this.router.navigate([link.navigationRouteUrl]);
  }

}
