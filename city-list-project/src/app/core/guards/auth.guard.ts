import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, Route } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../../modules/auth/services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private notificationService: NotificationService,
        private authService: AuthenticationService) { }

    /**
     * 
     * @param route  roter ref for that moment
     * @returns return boolen value can active ror not
     */
    canActivate(route: ActivatedRouteSnapshot): boolean {

        // is not authorized navigate to login page
        if (!this.authService.isAuthorized()) {
            // this.router.navigate(['not-found']);
            this.notificationService.openSnackBar(`You're not authorized to use this route`, 'red-snackbar');
            return false;
        }
        // iget role value from router data, and check is valid role for the current route. if not navigate to login page
        const roles = (route.data['roles'] ? route.data['roles'] : []) as any[];
        if ((roles.length > 0) && (!roles.some((r: string) => this.authService.hasRole(r)))) {
            // this.router.navigate(['not-found']);
            this.notificationService.openSnackBar(`You're not authorized to use this route`, 'red-snackbar');
            return false;
        }

        return true;
    }

    /**
     *  load specific module by checking this method
     * @param route 
     * @returns 
     */
    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.authService.isAuthorized()) {
            return false;
        }

        const roles = route.data && route.data['roles'] as any[];
        if (roles && !roles.some(r => this.authService.hasRole(r))) {
            return false;
        }

        return true;
    }
}
