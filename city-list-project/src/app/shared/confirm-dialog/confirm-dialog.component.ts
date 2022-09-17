import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalDialogIconColorEnum, ModalDialogIconTypeEnum, ModalDialogPrimaryButtonColorEnum } from '../enums/modal-dialog-input-types.enum';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
// this is common componet for dialog with custom template
export class ConfirmDialogComponent {
  title: string;
  message: string;
  dialogData: any;
  colorPrimary: string = ModalDialogPrimaryButtonColorEnum.PRIMARY;
  colorSecondary: string = "";
  iconType: any = ModalDialogIconTypeEnum.DEFAULT;
  iconColor: string = ModalDialogIconColorEnum.DEFAULT;
  hasCancelButton = true;
  primaryText: string = 'Yes';

  /**
   * 
   * @param dialogRef 
   * @param data dialog data - we can access data passed
   * @param dialog 
   */
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel,
    public dialog: MatDialog) {
    this.dialogData = data;
    this.title = data.title;
    this.message = data.message;
    if (data.colorPrimary) {
      this.colorPrimary = data.colorPrimary;
    }
    if (data.colorSecondary) {
      this.colorSecondary = data.colorSecondary;
    }
    if (data.iconType) {
      this.iconType = data.iconType;
    }
    if (data.hasCancelButton != null && data.hasCancelButton != undefined) {
      this.hasCancelButton = data.hasCancelButton;
    }
    if (data.primaryText) {
      this.primaryText = data.primaryText;
    }
    if (data.iconColor) {
      this.iconColor = data.iconColor;
    }
  }

  // oncinfirm this method call the onConfirm function that we passed with dialog ref;
  // dialogData.onConfirm() function just a reference. We have to override the implementation
  onConfirm(): void {
    if (this.dialogData?.onConfirm) {
      this.dialogData.onConfirm();
    }
    this.dialog.closeAll();
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class ConfirmDialogModel {

  constructor(
    public title: string, 
    public message: string, 
    public colorPrimary: ModalDialogPrimaryButtonColorEnum, 
    public colorSecondary: string, 
    public iconType: ModalDialogIconTypeEnum, 
    public hasCancelButton: boolean, 
    public primaryText: string, 
    public iconColor: ModalDialogIconColorEnum,
    public onConfirm: Function) {
  }
}
