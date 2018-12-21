import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { MatrixConstants } from '../constants/matrix.constants';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                if (localStorage.getItem(MatrixConstants.commonTerms.currentUser)) {
                    // auto logout if 401 response returned from api
                    this.authenticationService.logout();
                }
                location.reload(true);
            }

            const error = err.error.message || err.statusText;
            return _throw(error);
        }));
    }
}
