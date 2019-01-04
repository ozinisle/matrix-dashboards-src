import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { PocLandingPageService } from './poc-landing-page.service';
import { POCCardModelInterface } from '../models/interfaces/poc-card-models.interface';
import { POCCardModel } from '../models/poc-card.model';


@Injectable()
export class PocLandingPageResolver<T> implements Resolve<POCCardModelInterface[]> {
  constructor(private pocLandingPageService: PocLandingPageService) { }

  async resolve(): Promise<POCCardModelInterface[]> {
    try {
      const baseHref: string = document.getElementsByTagName('base')[0].href;
      return await this.pocLandingPageService.getPocConfigurationList().toPromise().then((pocListData) => {
        return pocListData.map(pocDataItem => {
          pocDataItem = Object.assign(new POCCardModel(), pocDataItem);
          return pocDataItem.setThumbnailImageUrl(`${baseHref}${pocDataItem.getThumbnailImageUrl()}`);
        });
      });
    } catch (exception) {
      console.error(exception);
    }
  }
}
