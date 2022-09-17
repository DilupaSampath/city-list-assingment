import { Observable } from "rxjs";

export interface ICommonPagination {
    
    getAllWithPagination(offset: number, pageSize: number): Observable<any>;

    getDataService(): any;

    getNotificationService(): any;
}