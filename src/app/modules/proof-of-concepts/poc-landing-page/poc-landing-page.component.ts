import { Component, OnInit } from '@angular/core';
import { POCCardModel } from '../models/poc-card.model';
import { POCCardModelInterface } from '../models/interfaces/poc-card-models.interface';
// import { PocCardIconType, PocCardType } from '../models/types/proof-of-concepts.types';
import { POCConstants } from '../constants/proof-of-concepts.constants';
import { Router, ActivatedRoute } from '@angular/router';
import { HTMLLinkPipe } from 'src/app/shared/pipes/htmlUtilityPipes/html-link.pipe';

@Component({
  selector: 'app-poc-landing-page',
  templateUrl: './poc-landing-page.component.html',
  styleUrls: ['./poc-landing-page.component.scss']
})
export class PocLandingPageComponent implements OnInit {

  public pocList: POCCardModelInterface[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    try {

      const pocConfigList: POCCardModelInterface[] = this.activatedRoute.snapshot.data.pocLandingPageData;

      pocConfigList.map(pocItem => {
        this.pocList.push(pocItem);
      });

      // const baseHref: string = document.getElementsByTagName('base')[0].href;
      // const futureCard: POCCardModel = (new POCCardModel())
      //   .setTitle('Future POC')
      //   .setsubTitle('Tech Spec')
      //   .setDescription('Will be added as and when created')
      //   .setThumbnailImageUrl(`${baseHref}assets/images/in-future.jpg`);

      // this.pocList.push(futureCard);

    } catch (exception) {
      console.error(exception);
    }
  }

  public openPoc(poc: POCCardModelInterface) {
    this.router.navigateByUrl(poc.getPocUrl());
  }

  public getCardContent(poc: POCCardModelInterface) {
    let descText: string = poc && poc.getDescription && poc.getDescription() ?
      poc.getDescription() : '';

    descText = (new HTMLLinkPipe()).transform(descText);

    return descText;
  }
}
