import { Injectable, Inject } from '@angular/core';
import { catchError, delay, map } from 'rxjs/operators';
import * as moment from 'moment';
import { of, Observable } from 'rxjs';
import { MainService } from '../../../core/services/api.service';
import { HttpParams } from '@angular/common/http';
import { ICommonPagination } from '../../../shared/interfaces/common-pagination.interface';

@Injectable({
    providedIn: 'root'
})
export class CityService {

    constructor(private _MainService: MainService,
        @Inject('LOCALSTORAGE') private localStorage: Storage) {
    }

    getAllWithPagination(offset: number, pageSize: number): Observable<any> {
        const params = new HttpParams()
            .set('offset', offset)
            .set('pageSize', pageSize);

        // '/city-service/cities'
        return this._MainService.get('/city-service/cities', params).pipe(
            catchError(error => {
                throw error;
            }),
            map((res: any) => res)
        );
    }

    getAll(): Observable<any> {

        return this._MainService.get('/city-service/cities', new HttpParams()).pipe(
            catchError(error => {
                throw error;
            }),
            map((res: any) => res)
        );
    }

    updateCity(cityData: any, id: number): Observable<any> {

        delete cityData.id;

        return this._MainService.put('/city-service/cities/'+ id, cityData).pipe(
            catchError(error => {
                throw error;
            }),
            map((res: any) => res)
        );
    }


    logout(): void {
        // clear token remove user from local storage to log user out
        this.localStorage.removeItem('currentUser');
    }

    getCurrentUser(): any {
        // TODO: Enable after implementation
        // return JSON.parse(this.localStorage.getItem('currentUser'));
        return {
            token: 'aisdnaksjdn,axmnczm',
            isAdmin: true,
            email: 'john.doe@gmail.com',
            id: '12312323232',
            alias: 'john.doe@gmail.com'.split('@')[0],
            expiration: moment().add(1, 'days').toDate(),
            fullName: 'John Doe'
        };
    }

    passwordResetRequest(email: string) {
        return of(true).pipe(delay(1000));
    }

    changePassword(email: string, currentPwd: string, newPwd: string) {
        return of(true).pipe(delay(1000));
    }

    passwordReset(email: string, token: string, password: string, confirmPassword: string): any {
        return of(true).pipe(delay(1000));
    }
}
