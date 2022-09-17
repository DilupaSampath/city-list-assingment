import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { AuthenticationService } from '../../modules/auth/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { GlobalFacadeService } from '../services/global-facade.service';

@Injectable()
/**
 * This interceptor loaded in App module. so this is the first interceptor that request or response facing
 */
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthenticationService,
        private router: Router,
        private dialog: MatDialog,
        private globalFacadeService: GlobalFacadeService) { }

    /**
     * Intercept request and response. set request header and check response status
     * @param req 
     * @param next 
     * @returns 
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const user = this.authService.getCurrentUser();

        // is this login route, skip
        if (req.url.indexOf('/user/login') !== -1) {
            return next.handle(req);
        }
        if (req.url.indexOf('/user/register') !== -1) {
            return next.handle(req);
        }

        // check token availability and set the Authorization header
        if (user && user.token) {

            const cloned = req.clone({
                headers: req.headers.set('Authorization',
                    'Bearer ' + user.token)
            });
            // if respose return Unauthorized navigate to login page
            return next.handle(cloned).pipe(tap(() => { }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.dialog.closeAll();
                        // this.router.navigate(['/auth-user/login']);
                        this.loadNotAuthorizeDialog();
                    }
                }
            }));

        } else {
            this.loadNotAuthorizeDialog();
            // if respose return Unauthorized navigate to login page
            // return next.handle(req).pipe(tap(() => { }, (err: any) => {
            //     if (err instanceof HttpErrorResponse) {
            //         if (err.status === 401) {
            //             this.dialog.closeAll();
            //             // this.router.navigate(['/auth-user/login']);
                        
            //         }
            //     }
            // }));
            return next.handle(req);
        }
    }

    private loadNotAuthorizeDialog(){
        this.globalFacadeService.sharedEventDataHandlerService.triggerGlobalEventHandler(null, 'NOT_AUTHORIZE');
    }
}
