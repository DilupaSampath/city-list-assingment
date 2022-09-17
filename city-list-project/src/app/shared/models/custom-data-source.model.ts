import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";
import { NotificationService } from "src/app/core/services/notification.service";
import { ICommonPagination } from "../interfaces/common-pagination.interface";


// custom data source model for pagination. 
export class CustomDatasourceModel implements DataSource<any> {

    private dataSourceSubject = new BehaviorSubject<any[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);
    public counter$ = this.countSubject.asObservable();

    public loading$ = this.loadingSubject.asObservable();

    private clientSideDataSource!: MatTableDataSource<any>;

    constructor(private commonPagination: ICommonPagination,
        private notificationService: NotificationService) {}

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.dataSourceSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSourceSubject.complete();
        this.countSubject.complete();
        this.loadingSubject.complete();
    }

    setClientSideDataSource(source: MatTableDataSource<any>){
        this.clientSideDataSource = source;
    }

    getClientSideDataSource(){
        return this.clientSideDataSource;
    }
    
    loadData(pageIndex = 0, pageSize = 10) {

        this.loadingSubject.next(true);

        this.commonPagination.getAllWithPagination(
            pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe({
                next: (result) => {
                    if (result?.data?.content) {
            this.dataSourceSubject.next(result.data.content);
            this.countSubject.next(result.data.totalElements);
                   }
                    // this.router.navigate(['/']);
                },
                error: (error) => {
                    this.notificationService.openSnackBar(error.error, 'red-snackbar');
                }
            });
    }    
}