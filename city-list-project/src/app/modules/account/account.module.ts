import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountPageComponent } from './account-page/account-page.component';
import { UpdateRoleComponent } from './update-role/update-role.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule
  ],
  declarations: [AccountPageComponent, UpdateRoleComponent, ProfileDetailsComponent],
  exports: [AccountPageComponent]
})
export class AccountModule { }
