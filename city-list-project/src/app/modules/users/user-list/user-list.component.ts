import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';

import { NGXLogger } from 'ngx-logger';
import { GlobalFacadeService } from 'src/app/core/services/global-facade.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ModalDialogIconColorEnum, ModalDialogIconTypeEnum, ModalDialogPrimaryButtonColorEnum } from 'src/app/shared/enums/modal-dialog-input-types.enum';
import { TableDataTypeEnum } from 'src/app/shared/enums/table-data-type.enum';
import { UserRoleEnum } from 'src/app/shared/enums/user-role.enum';
import { IUserData } from 'src/app/shared/interfaces/user-data.interface';
import { IUserRole } from 'src/app/shared/interfaces/user-role.interface';
import { CustomDatasourceModel } from 'src/app/shared/models/custom-data-source.model';
import { TableColumDataModel } from 'src/app/shared/models/table-colum-data.model';
import { AuthenticationService } from '../../auth/services/auth.service';
import { UserPaginationModel } from '../models/user-pagination.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  dataSource: MatTableDataSource<any>;
  userPaginationModel: UserPaginationModel;
  userData: any[] = [];
  displayedColumns: string[] = ['STATUS','ID', 'NAME', 'EMAIL', 'LIST'];
  tableColumDataModel: TableColumDataModel[] = [];
  loading!: boolean;
  userId!: number;
  userRole!: string;
  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private globalFacadeService: GlobalFacadeService
  ) {
    this.generateTableColumDataModel();
    this.userPaginationModel = new UserPaginationModel(userService, notificationService);
    this.dataSource = new MatTableDataSource<any>([]);
    // this.dataSource.setClientSideDataSource(new MatTableDataSource<Element>(this.userData));
    this.loadUserData();
    globalFacadeService.sharedEventDataHandlerService.globalEventHandler$.subscribe((result: any)=>{
      if(result?.EVENT === 'UPDATE_PAGINATION_USER'){
        this.loadUserData();
        }
    });
  }

  ngOnInit() {
    this.titleService.setTitle('City List Project - Users');
    this.logger.log('Users loaded');
  }

  loadUserData() {
    this.userService.getAll().subscribe((result: IUserData[]) => {
      this.dataSource = new MatTableDataSource<any>(result)
    });
  }


  generateTableColumDataModel() {
    const user = this.authenticationService.getCurrentUser();
    this.tableColumDataModel = [];
    for (const elementData of this.displayedColumns) {
      const item = new TableColumDataModel();

      switch (elementData) {
        case 'STATUS':
          item.type = TableDataTypeEnum.STATUS;
          item.key = 'STATUS';
          item.text = 'STATUS';
          item.matColumnDef = 'STATUS';
          item.authData = user?.username;
          break;
        case 'ID':
          item.type = TableDataTypeEnum.TEXT;
          item.key = 'id';
          item.text = 'ID';
          item.matColumnDef = 'ID';
          item.authData = user?.username;
          break;
        case 'NAME':
          item.type = TableDataTypeEnum.TEXT;
          item.key = 'username';
          item.text = 'Name';
          item.matColumnDef = 'NAME';
          item.authData = user?.username;
          break;
        case 'EMAIL':
          item.type = TableDataTypeEnum.TEXT;
          item.key = 'email';
          item.text = 'Email';
          item.matColumnDef = 'EMAIL';
          item.authData = user?.username;
          break;
        case 'LIST':
          item.type = TableDataTypeEnum.LIST;
          item.key = 'roles';
          item.text = 'Permission';
          item.matColumnDef = 'LIST';
          item.authData = user?.username;
          item.triggerOnlickEvent = true;
          break;

        default:
          break;
      }
      this.tableColumDataModel.push(item);
    }
  }

  editEvent(eventData: any){
    console.log(eventData);
    this.userRole = eventData.type;
    this.userId = eventData.id;
    this.openDialog(eventData, true);
  }

  viewEvent(eventData: any){
    console.log(eventData);
    this.openDialog(eventData, true);
  }


  openDialog(eventData: any, isEdit: boolean): void {
    const dialogData: ConfirmDialogModel = {
      title: 'Are you sure ?',
      message: 'Do you want to give ' + ((eventData.type === UserRoleEnum.ROLE_ALLOW_EDIT) ? 'ADMIN' : 'USER') +' permission to '+ eventData.username,
      hasCancelButton: true,
      primaryText: 'Yes',
      colorPrimary: ModalDialogPrimaryButtonColorEnum.PRIMARY,
      colorSecondary: ModalDialogPrimaryButtonColorEnum.DEFAULT,
      iconType: ModalDialogIconTypeEnum.WARNING,
      iconColor: ModalDialogIconColorEnum.WARNING,
      onConfirm: this.updateUser.bind(this)
  };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px', disableClose: true,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      // ...
    });
  }

  updateUser(){
    this.loading = true;
    const role : IUserRole = {
      name: this.userRole
    }
    const data = {
      id: this.userId,
      roles: [role]
    }
    console.log("User updated");
    this.userService.updateUser(data, this.userId).subscribe({
      next: (data) => {
           if (data) {
            this.notificationService.openSnackBar('User role updated successfully', 'green-snackbar');
            this.globalFacadeService.sharedEventDataHandlerService.triggerGlobalEventHandler(null, 'UPDATE_PAGINATION_USER');
          }
          this.loading = false;
           // this.router.navigate(['/']);
       },
       error: (error) => {
           this.notificationService.openSnackBar(error.error, 'red-snackbar');
           this.loading = false;
       }}
   );
  }
  
}

// export interface Element {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }
