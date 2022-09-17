import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/modules/auth/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { GlobalFacadeService } from 'src/app/core/services/global-facade.service';
import { IUserData } from 'src/app/shared/interfaces/user-data.interface';


@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent implements OnInit {

  form!: FormGroup;
  hideCurrentPassword: boolean;
  hideNewPassword: boolean;
  currentPassword!: string;
  newPassword!: string;
  newPasswordConfirm!: string;
  disableSubmit!: boolean;

  constructor(
    private globalFacadeService: GlobalFacadeService) {

    this.hideCurrentPassword = true;
    this.hideNewPassword = true;
  }

  ngOnInit() {
    this.globalFacadeService.sharedEventDataHandlerService.globalEventHandler$.subscribe((eventData: any)=>{
      if(eventData?.EVENT === 'LOAD_USER' && eventData?.data?.id){
        const userData: IUserData = eventData?.data;
        this.form.patchValue({
          userName: 'Mahesh', 
          gender: 'male',
          tc: true
        }); 
      }
    });
    this.form = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      newPasswordConfirm: new FormControl('', Validators.required),
    });
  }

  changePassword() {
  }
}
