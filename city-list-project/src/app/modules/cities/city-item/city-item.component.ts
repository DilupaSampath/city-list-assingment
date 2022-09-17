import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from 'src/app/core/services/api.service';
import { GlobalFacadeService } from 'src/app/core/services/global-facade.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { SharedEventDataHandlerService } from 'src/app/shared/services/shared-event-data-handler.service';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-city-item',
  templateUrl: './city-item.component.html',
  styleUrls: ['./city-item.component.css']
})
export class CityItemComponent implements OnInit {
  public breakpoint: number; // Breakpoint observer code
  public cityName: string = ``;
  public cityImage: string = ``;
  public cityForm: FormGroup;
  public isfailImage: boolean = false;
  wasFormChanged = false;
  cityId: number = 0;
  loading!: boolean;
  isEditMode: boolean;
  constructor(    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: CityItemComponentModel,
    public dialog: MatDialog,
    private cityService: CityService,
    private notificationService: NotificationService,
    private globalFacadeService: GlobalFacadeService) { 
      let url_pattern = /^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i;
      this.cityId = data.cityId;
      this.cityName = data.cityName;
      this.cityImage = data.cityImage;
      this.isEditMode = data.isEdit;
      this.isfailImage = data.isFailImage
      this.cityForm = this.fb.group({
        name: [this.cityName, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
        photo: [this.cityImage, [Validators.required, Validators.pattern(url_pattern)]]
      });
      this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
    }

  ngOnInit(): void {
  }

  
  public onAddCus(): void {
    this.markAsDirty(this.cityForm);
  }

  openDialog(): void {
    console.log(this.wasFormChanged);
    if(this.cityForm.valid){
      if(this.cityForm.dirty) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '340px',
          data:{
            title: 'Do you want to update the city?',
            message: '',
            id: this.cityId,
            name: this.cityForm.controls['name'].value,
            photo: this.cityForm.controls['photo'].value,
            onConfirm: this.updateCity.bind(this)
          }
        });
      } else {
        this.dialog.closeAll();
      }
    }
  }

  closeDialog(){
    console.log(this.wasFormChanged);
    if(this.cityForm.dirty) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '340px',
        data:{
          title: 'Do you want to discard the changes?',
          message: ''
        }
      });
    } else {
      this.dialog.closeAll();
    }
  }

  // tslint:disable-next-line:no-any
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    // tslint:disable-next-line:forin
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }

  formChanged() {
    this.wasFormChanged = true;
  }


  updateCity(){
    this.loading = true;
    const data = {
      id: this.cityId,
      name: this.cityForm.controls['name'].value,
      photo: this.cityForm.controls['photo'].value,
    }
    console.log("City updated");
    this.cityService.updateCity(data, this.cityId).subscribe({
      next: (data) => {
           if (data) {
            this.notificationService.openSnackBar('City updated successfully', 'green-snackbar');
            this.globalFacadeService.sharedEventDataHandlerService.triggerGlobalEventHandler(null, 'UPDATE_PAGINATION_CITY');
          }
           // this.router.navigate(['/']);
       },
       error: (error) => {
           this.notificationService.openSnackBar(error.error, 'red-snackbar');
           this.loading = false;
       }}
   );
  }

  
}


/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
 export class CityItemComponentModel {

  constructor(public cityId: number, public cityName: string, public cityImage: string, public isEdit: boolean, public isFailImage: boolean) {
  }
}
