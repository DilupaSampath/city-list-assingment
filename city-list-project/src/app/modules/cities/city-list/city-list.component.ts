import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CityService } from '../services/city.service';
import { MatDialog } from '@angular/material/dialog';
import { CityItemComponent } from '../city-item/city-item.component';
import { CityPaginationModel } from '../models/city-pagination.model';
import { CustomDatasourceModel } from '../../../shared/models/custom-data-source.model';
import { TableColumDataModel } from 'src/app/shared/models/table-colum-data.model';
import { TableDataTypeEnum } from 'src/app/shared/enums/table-data-type.enum';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {
  dataSource: CustomDatasourceModel;
  cityPaginationModel: CityPaginationModel;
  displayedColumns: string[] = ['ID', 'NAME', 'IMAGE', 'ACTION'];
  tableColumDataModel: TableColumDataModel[] = [];
  loading!: boolean;
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private cityService: CityService,
    private dialog: MatDialog
  ) {
    this.cityPaginationModel = new CityPaginationModel(cityService, notificationService);
    this.dataSource = new CustomDatasourceModel(this.cityPaginationModel, notificationService);
    this.generateTableColumDataModel();
  }

  ngOnInit() {
    this.titleService.setTitle('City List');
    this.logger.log('Cities loaded');
    this.dataSource = new CustomDatasourceModel(this.cityPaginationModel, this.notificationService);

  }
  generateTableColumDataModel() {
    this.tableColumDataModel = [];
    for (const elementData of this.displayedColumns) {
      const item = new TableColumDataModel();

      switch (elementData) {
        case 'IMAGE':
          item.type = TableDataTypeEnum.IMAGE;
          item.key = 'photo';
          item.text = 'Image';
          item.matColumnDef = 'IMAGE';
          break;
        case 'NAME':
          item.type = TableDataTypeEnum.TEXT;
          item.key = 'name';
          item.text = 'Name';
          item.matColumnDef = 'NAME';
          break;
        case 'ID':
          item.type = TableDataTypeEnum.TEXT;
          item.key = 'id';
          item.text = 'ID';
          item.matColumnDef = 'ID';
          break;
        case 'ACTION':
          item.type = TableDataTypeEnum.ACTION;
          item.key = 'ACTION';
          item.text = 'ACTION';
          item.matColumnDef = 'ACTION';
          break;
        default:
          break;
      }
      this.tableColumDataModel.push(item);
    }
  }

  ngAfterViewInit() {
    // this.dataSource.counter$
    //   .pipe(
    //     tap((count) => {
    //       // this.paginator.length = count;
    //     })
    //   )
    //   .subscribe();

    // this.paginator.page
    //   .pipe(
    //     tap(() => this.loadCities())
    //   )
    //   .subscribe();
  }

  loadCities() {
    // this.dataSource.loadCities(this.paginator.pageIndex, this.paginator.pageSize);
  }

  editContact(cityData: any) {
    console.log(cityData);
    let route = '/contacts/edit-contact';
    this.openDialog(cityData, true);
    // this.router.navigate([route], { queryParams: { id: contact.id } });
  }

  viewContact(cityData: any) {
    console.log(cityData);
    let route = '/contacts/view-contact';
    this.openDialog(cityData, false);
    // this.router.navigate([route], { queryParams: { id: contact.id } });
  }

  openDialog(cityData: any, isEdit: boolean): void {
    const dialogRef = this.dialog.open(CityItemComponent, {
      width: '640px', disableClose: true,
      data: {
        cityId: cityData.id,
        cityName: cityData.name,
        cityImage: cityData.photo,
        isEdit,
        isFailImage: cityData.imageLoadFail
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      // ...
    });
  }
}
