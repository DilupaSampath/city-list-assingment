import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { LayoutComponent } from './layout/layout.component';
import { UserRoleDirective } from './directives/user-role.directive';
import { PaginationTableComponent } from './components/pagination-table/pagination-table.component';
import { SnackBarContentComponent } from './components/snack-bar-content/snack-bar-content.component';
import { TextTitleCasePipe } from './pipes/title-case.pipe';
import { HandleMissingImageDirective } from './directives/handle-missing-image.directive';

@NgModule({
  imports: [
    RouterModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  declarations: [
    ConfirmDialogComponent,
    LayoutComponent,
    UserRoleDirective,
    PaginationTableComponent,
    SnackBarContentComponent,
    TextTitleCasePipe,
    HandleMissingImageDirective
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CustomMaterialModule,
    ConfirmDialogComponent,
    UserRoleDirective,
    PaginationTableComponent,
    TextTitleCasePipe,
    HandleMissingImageDirective
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
