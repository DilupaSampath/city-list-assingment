import { HttpClient, HttpHeaders, HttpParams, HttpStatusCode, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { IResponseData } from 'src/app/shared/interfaces/pagination-behavior.interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
/**
 * This is the global Http Client handling place. All requests will be navigating throug this handler
 */
export class MainService {
  constructor(private http: HttpClient) {}

 // Setting Headers for API Request
 private setHeaders(): HttpHeaders {
  const headersConfig = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };
  return new HttpHeaders(headersConfig);
}

  // Perform a GET Request
  get<T = HttpStatusCode>(path: string, params: HttpParams): Observable<IResponseData<T>> {
    return this.http
    .get(`${environment.api_url}${path}`, { headers: this.setHeaders(), params })
      .pipe(
        map((res: any): IResponseData<T> => ({
            data: res.data,
            message: res.message,
            status: res.status
        }))
      );
  }

  // Perform a PUT Request
  put(path: string, body: any): Observable<any> {
    return this.http
      .put(
        `${environment.api_url}${path}`,
        JSON.stringify(this.filterInputs(body)), { headers: this.setHeaders() }
      )
      .pipe(
        catchError(error => {
          throw error;
        }),
        map((res: any) => res)
      );
  }

  // Perform a PATCH Request
  patch(path: string, body: any): Observable<any> {
    return this.http
      .patch(
        `${environment.api_url}${path}`,
        JSON.stringify(this.filterInputs(body)), { headers: this.setHeaders() }
      )
      .pipe(
        catchError(error => {
          throw error;
        }),
        map((res: any) => res)
      );
  }

  // Perform POST Request
  post(path: string, body: any, isFormType: boolean): Observable<any> {
    return this.http
      .post(
        `${environment.api_url}${path}`,
        isFormType ? body : this.filterInputs(body), { headers: this.setHeaders() }
      )
      .pipe(
        catchError(error => {
          throw error;
        }),
        map((res: any) => res)
      );
  }

  // Perform Delete Request
  delete(path: any): Observable<any> {
    return this.http
      .delete(`${environment.api_url}${path}`, { headers: this.setHeaders() })
      .pipe(
        catchError(error => {
          throw error;
        }),
        map((res: any) => res)
      );
  }

  // filter the body input values
  filterInputs(input: any) {
    const tempObj: any = {};
    Object.keys(input).forEach(key => {
      if (
        input[key] !== undefined &&
        input[key] !== null &&
        input[key] !== ''
      ) {
        tempObj[key] = input[key];
      }
    });

    return tempObj;
  }
}
