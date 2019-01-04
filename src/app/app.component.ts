import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'matrix-dashboards';

  ngOnInit(): void {
    // Adobe Dynamic Tagging
    // if (environment.baseHref) {
    //   const base: HTMLCollectionOf<HTMLBaseElement> = document.getElementsByTagName('base');
    //   base[0].href = environment.baseHref;
    // }
  }

}
