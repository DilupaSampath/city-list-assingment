import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/modules/auth/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { LoginSessionModel } from 'src/app/shared/models/login-session.model';
import { GlobalFacadeService } from 'src/app/core/services/global-facade.service';
import { IUserData } from 'src/app/shared/interfaces/user-data.interface';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    displayName: string = 'ss dsdas';
    loginForm!: FormGroup;
    loading!: boolean;

    constructor(private router: Router,
        private titleService: Title,
        private notificationService: NotificationService,
        private authenticationService: AuthenticationService,
        private globalFacadeService: GlobalFacadeService) {
    }

    ngOnInit() {
        this.titleService.setTitle('City List Project - Login');
        this.authenticationService.logout();
        this.createForm();
        this.globalFacadeService.sharedEventDataHandlerService.globalEventHandler$.subscribe((eventData)=>{
            if(eventData?.EVENT === 'REGISTER_SUCCESS' && eventData?.data?.username){
                const userData: IUserData = eventData?.data;
                this.loginForm.patchValue({
                  userName: eventData?.data?.username, 
                  gender: 'male',
                  tc: true
                }); 
              }
        });
    }

    private createForm() {
        const savedUserName = localStorage.getItem('savedUserName');

        this.loginForm = new FormGroup({
            userName: new FormControl(savedUserName, [Validators.required]),
            password: new FormControl('', Validators.required),
            rememberMe: new FormControl(savedUserName !== null)
        });
    }

    login() {
        const userName = this.loginForm.get('userName')?.value;
        const password = this.loginForm.get('password')?.value;
        const rememberMe = this.loginForm.get('rememberMe')?.value;

        
        this.loading = true;
        this.authenticationService
            .login(userName, password)
            .subscribe({
               next: (data) => {
                    if (rememberMe) {
                        localStorage.setItem('savedUserName', userName);
                    } else {
                        localStorage.removeItem('savedUserName');
                    }
                    if (data) {

                        const loginSessionModel = new LoginSessionModel();
                        loginSessionModel.setEmail(data.email);
                        loginSessionModel.setName(data.name);
                        loginSessionModel.setToken(data.access_token);
                        loginSessionModel.setId(data.id);
                        loginSessionModel.setRole(data.roles);
                        loginSessionModel.setRedirectData('/');
                        loginSessionModel.writeExternal();
                        this.router.navigate(['cities']);
                    }
                    // this.router.navigate(['/']);
                },
                error: (error) => {
                    // this.notificationService.openSnackBar(error.error, 'red-snackbar');
                    this.loading = false;
                }}
            );
    }

    resetPassword() {
        this.router.navigate(['/auth/password-reset-request']);
    }

    logOut(){
      }

      isAuthenticated(){
      }
      
}
