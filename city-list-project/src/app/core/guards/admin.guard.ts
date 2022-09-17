import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../modules/auth/services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private router: Router,
        private authService: AuthenticationService) { }

        canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            if (!this.authService.isAuthorized()) {
                this.router.navigate(['login']);
                return false;
            }
            const roles = route.data['roles'] as any[];
            if (roles && !roles.some(r => this.authService.hasRole(r))) {
                this.router.navigate(['error', 'not-found']);
                return false;
            }
            return true;
        }
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
