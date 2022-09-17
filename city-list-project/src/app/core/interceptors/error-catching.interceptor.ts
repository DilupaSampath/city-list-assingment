import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { GlobalFacadeService } from "../services/global-facade.service";

@Injectable()
/**
 * This interceptor loaded in Shared module. so this is the second interceptor that request or response facing
 */
export class ErrorCatchingInterceptor implements HttpInterceptor {

    constructor(private globalFacadeService: GlobalFacadeService) {
    }
/**
 * Intercept response. refactor the error response to specific format
 * @param request 
 * @param next 
 * @returns 
 */
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
 

        return next.handle(request)
            .pipe(
                map(res => {
                    return res

                }),
                catchError((error: HttpErrorResponse) => {
                    let errorMsg: any = [];
                    if((error.status === 504) || (error.statusText.indexOf('Gateway Timeout') > -1)){
                        this.globalFacadeService.notificationService.openSnackBar('Something went wrong on our side, Please try again later..!', 'red-snackbar');
                    }else if (error.error instanceof ErrorEvent) {
                        console.log('This is client side error');
                        errorMsg = `Error: ${error.error.message}`;
                        this.globalFacadeService.notificationService.openSnackBar(errorMsg, 'red-snackbar')
                    } else {
                        console.log('This is server side error');
                        if(Array.isArray(error?.error?.message)){
                            errorMsg = error?.error?.message;
                            this.globalFacadeService.notificationService.openSnackBarWithComponent(errorMsg, 'red-snackbar');
                        }

                    }
                    console.log(errorMsg);
                    return throwError(errorMsg);
                })
            )
    }
}