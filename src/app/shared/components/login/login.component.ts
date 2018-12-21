import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertService } from '../../../shared/directives/alert/alert.service';
import { MatrixConstants } from '../../../shared/constants/matrix.constants';
import { LoginForm } from '../../models/login-component.model';
import { LoginComponentInterface } from '../../models/interfaces/login-component.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, LoginComponentInterface {
  public loginForm: LoginForm = new LoginForm();
  public loading = false;
  public submitted = false;
  public returnUrl: string;

  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams[MatrixConstants.values.returnUrlParamKey] || '/';
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.isValidationSuccess()) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.loginForm.username.value, this.loginForm.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}

