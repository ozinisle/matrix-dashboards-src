import { Component, OnInit } from '@angular/core';
import { MatrixHttpService } from 'src/app/shared/services/matrix-http.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-serve-static-content',
  templateUrl: './serve-static-content.component.html',
  styleUrls: ['./serve-static-content.component.scss']
})
export class ServeStaticContentComponent {

  public myTemplate: any = '';

  constructor(private http: HttpClient) {
    http.get('/assets/html/asset-serve-static-content.html', { responseType: 'text' })
      .toPromise().then((html: any) => this.myTemplate = html);
  }

}
