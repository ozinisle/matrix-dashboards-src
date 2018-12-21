import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthenticationService } from './shared/services/authentication.service';
import { MatrixCommunicationChannelEncryptionService } from './shared/services/matrix-communication-channel-encryption.service';
import { MatrixErrorHandlerService } from './shared/services/matrix-error-handler.service';
import { MatrixHttpService } from './shared/services/matrix-http.service';
import { UserService } from './shared/services/user.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    // AuthenticatedContentLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    // AuthenticatedContentLayoutComponent
  ],
  providers: [
    AuthenticationService,
    MatrixCommunicationChannelEncryptionService,
    MatrixErrorHandlerService,
    MatrixHttpService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
