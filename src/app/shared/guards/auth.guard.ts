import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MatrixConstants } from '../../shared/constants/matrix.constants';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem(MatrixConstants.commonTerms.currentUser)) {
            // logged in so return true
            this.authService.setUserAuthenticated(true);
            return true;
        }

        this.authService.setUserAuthenticated(false);
        // not logged in so redirect to login page with the return url
        this.router.navigate([MatrixConstants.url.loginUrl], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
