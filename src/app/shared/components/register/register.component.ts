import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../shared/directives/alert/alert.service';
import { AuthenticationService } from '../../services/authentication.service';
import { MatrixCommunicationChannelEncryptionService } from '../../services/matrix-communication-channel-encryption.service';
import { MatrixRegistrationResponseModel } from '../../models/registration.model';
import { MatrixErrorHandlerService } from '../../../shared/services/matrix-error-handler.service';
import { MatrixRegistrationResponseModelInterface } from '../../models/interfaces/registration-model.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private commChannelEncryptor: MatrixCommunicationChannelEncryptionService,
    private errorHandler: MatrixErrorHandlerService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.registerUser(this.registerForm.value)
      .subscribe(
        data => {
          try {
            console.log('registration encrypted response >>> ' + data);
            // this.alertService.success(MatrixConstants.messages.registrationSuccess, true);
            // this.router.navigate([MatrixConstants.url.login]);
            console.log('registration decrypted response >>> ' +
              this.commChannelEncryptor.CryptoJS_Aes_OpenSSL_Decrypt(data));

            const registrationResponse: MatrixRegistrationResponseModelInterface =
              <MatrixRegistrationResponseModel>this.commChannelEncryptor.CryptoJS_Aes_OpenSSL_Decrypt(data);

            this.loading = false;
          } catch (error) {
            this.errorHandler.handleError(error);
          }
        },
        error => {
          this.errorHandler.handleError(error);
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
