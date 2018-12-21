import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-matrix-header',
  templateUrl: './matrix-header.component.html',
  styleUrls: ['./matrix-header.component.scss']
})
export class MatrixHeaderComponent implements OnInit {



  constructor(public authService: AuthenticationService) { }

  ngOnInit() {

  }



  public signOut(): void {
    this.authService.logout();
  }
}
