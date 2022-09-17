import { catchError, map, Observable } from "rxjs";
import { NotificationService } from "src/app/core/services/notification.service";
import { ICommonPagination } from "../../../shared/interfaces/common-pagination.interface";
import { UserService } from "../services/user.service";

export class UserPaginationModel implements ICommonPagination {

    constructor(
        private userService: UserService, 
        private notificationService: NotificationService) {
    }
    
    getDataService() {
        return this.userService;
    }
    getNotificationService() {
        return this.notificationService;
    }
    


    getAllWithPagination(offset: number, pageSize: number): Observable<any> {
        return this.userService.getAllWithPagination(offset, pageSize).pipe(
            catchError(error => {
                throw error;
            }),
            map((res: any) => res)
        );
    }
}