import { Injectable, Inject } from '@angular/core';
import { catchError, delay, map } from 'rxjs/operators';
import * as moment from 'moment';

import { environment } from '../../../../environments/environment';
import { of, Observable } from 'rxjs';
import { MainService } from '../../../core/services/api.service';
import { LoginSessionModel } from 'src/app/shared/models/login-session.model';
import { IUserData } from 'src/app/shared/interfaces/user-data.interface';
import { TabDataExternalizableEnum } from 'src/app/shared/enums/tab-data-externalizable.enum';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private _MainService: MainService,
        @Inject('LOCALSTORAGE') private localStorage: Storage) {
    }

    isAuthorized() {
        return !!this.getCurrentUser()?.token;
    }

    isActive(userName: string): boolean {
        const currentUser = this.getCurrentUser();
        if (currentUser?.username === userName) {
            return true;
        }
        return false;

    }

    hasRole(role: string) {
        const roles = this.getCurrentUser()?.roles;
        const rolesSet: Set<string> = roles ? new Set(roles) : new Set();

        return this.isAuthorized() && rolesSet.has(role);
    }

    login(email: string, password: string): Observable<any> {
        const body = {
            "grant_type": "password",
            "username": "suranga",
            "password": "spass"
        }
        // const body = {
        //     "grant_type": "password",
        //     "username": email,
        //     "password": password
        // }


        return this._MainService.post('/authenticate/user/login', body, false).pipe(
            catchError(error => {
                throw error;
            }),
            map((res: any) => res)
        );
    }


    register(user: any): Observable<any> {
        const body = {
            "email": user.email,
            "username": user.username,
            "password": user.password
        }


        return this._MainService.post('/authenticate/user/register', body, false).pipe(
            catchError(error => {
                throw error;
            }),
            map((res: any) => res)
        );
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        sessionStorage.removeItem(TabDataExternalizableEnum.SESSION_DATA);

    }

    getCurrentUser(): IUserData {
        // TODO: Enable after implementation
        const loginSessionModel = new LoginSessionModel();
        loginSessionModel.readExternal();

        // const access_token =  this.localStorage.getItem('access_token');
        // const roles: any =  this.localStorage.getItem('roles') ? JSON.parse(this.localStorage.getItem('roles') as string) : [];
        // const roleSet = new Set(roles);
        return {
            token: loginSessionModel.getToken(),
            roles: loginSessionModel.getRole(),
            email: loginSessionModel.getEmail(),
            id: loginSessionModel.getId(),
            username: loginSessionModel.getName()
        };
    }
}
