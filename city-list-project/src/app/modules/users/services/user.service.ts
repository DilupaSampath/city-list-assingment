import { Injectable, Inject } from '@angular/core';
import { catchError, delay, map } from 'rxjs/operators';
import * as moment from 'moment';
import { of, Observable } from 'rxjs';
import { MainService } from '../../../core/services/api.service';
import { HttpParams } from '@angular/common/http';
import { IUserData } from 'src/app/shared/interfaces/user-data.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private _MainService: MainService) {
    }

    getAllWithPagination(offset: number, pageSize: number): Observable<any> {
        const params = new HttpParams()
            .set('offset', offset)
            .set('pageSize', pageSize);

        return this._MainService.get('/user-service/user', params).pipe(
            catchError(error => {
                throw error;
            }),
            map((res: any) => res)
        );
    }

    getAll(): Observable<any> {

        return this._MainService.get('/user-service/user', new HttpParams()).pipe(
            map((res: any) => {
                const userDataList: IUserData[] = [];
                res.data.forEach((element: any) => {
                    const userData: IUserData = {
                        token: '',
                        username: element?.username,
                        email: element?.email,
                        id: element.id,
                        roles: element?.roles
                    }
                    userDataList.push(userData);
                });
                return userDataList;
            })
        );
    }

    updateUser(userData: any, id: number): Observable<any> {
        delete userData.id;

        return this._MainService.put('/user-service/user/'+id, userData).pipe(
            catchError(error => {
                throw error;
            }),
            map((res: any) => res)
        );
    }
}
