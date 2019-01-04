import { Injectable } from '@angular/core';
import { MatrixHttpService } from 'src/app/shared/services/matrix-http.service';
import { Observable } from 'rxjs/Observable';
import { POCCardModelInterface } from '../models/interfaces/poc-card-models.interface';

@Injectable()
export class PocLandingPageService {

  constructor(private matHttp: MatrixHttpService) { }

  getPocConfigurationList(): Observable<POCCardModelInterface[]> {
    return this.matHttp.doGet(`/assets/config/poc-landing-page.config.json`);
  }

}


