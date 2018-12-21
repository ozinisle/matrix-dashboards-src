import { Component, OnInit } from '@angular/core';
import { POCCardModel } from '../models/poc-card.model';
import { POCCardModelInterface } from '../models/interfaces/poc-card-models.interface';
import { PocCardIconType, PocCardType } from '../models/types/proof-of-concepts.types';
import { POCConstants } from '../constants/proof-of-concepts.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poc-landing-page',
  templateUrl: './poc-landing-page.component.html',
  styleUrls: ['./poc-landing-page.component.scss']
})
export class PocLandingPageComponent implements OnInit {

  public pocList: POCCardModelInterface[] = [];

  constructor(private router: Router) { }

  ngOnInit() {

    try {

      const typeAHeadImageSearchPerformancePocCard: POCCardModel = (new POCCardModel())
        .setDescription('Proof of speed/performance when loading/searching for image entities while loading 200+ at a time')
        .setTitle('200+ image load on page load and keyword search')
        .setsubTitle('Angular7, PHP')
        .setIconType(PocCardIconType.performance)
        .setPocUrl(POCConstants.urls.fastImageSearch);

      const futureCards: POCCardModel = (new POCCardModel())
        .setDescription('Will be added as and when created')
        .setTitle('Future POC')
        .setsubTitle('Tech Spec')
        .setIconType(PocCardIconType.inFuture);

      this.pocList = [typeAHeadImageSearchPerformancePocCard, futureCards, futureCards, futureCards, futureCards, futureCards];

    } catch (exception) {
      console.error(exception);
    }
  }

  public openPoc(poc: POCCardModelInterface) {
    this.router.navigateByUrl(poc.getPocUrl());
  }

  public getPocCardThumbNailImage(poc: POCCardModelInterface) {
    const baseHref: string = document.getElementsByTagName('base')[0].href;
    if (poc.getIconType() === PocCardIconType.performance) {
      return `url(${baseHref}assets/images/performance.png)`;
    } else {
      return `url(${baseHref}assets/images/in-future.jpg)`;
    }
  }
}
