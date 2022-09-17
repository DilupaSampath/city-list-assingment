import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GlobalFacadeService } from 'src/app/core/services/global-facade.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { confirmPasswordValidator } from 'src/app/shared/validators/form-group-field-mismatch.validator';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnChanges {

  displayName: string = 'ss dsdas';
    registerForm!: FormGroup;
    loading!: boolean;

    constructor(private router: Router,
        private titleService: Title,
        private notificationService: NotificationService,
        private authenticationService: AuthenticationService,
        private globalFacadeService: GlobalFacadeService) {
    }
    ngOnChanges(changes: SimpleChanges): void {
        throw new Error('Method not implemented.');
    }

    ngOnInit() {
        this.titleService.setTitle('City List Project - Register');
        this.authenticationService.logout();
        this.createForm();
    }

    private createForm() {
        const savedUserEmail = localStorage.getItem('savedUserEmail');

        this.registerForm = new FormGroup({
            email: new FormControl(savedUserEmail, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
            username: new FormControl(savedUserEmail, [Validators.required]),
            password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{5,}$')])
        });
    }

    register() {
        const email = this.registerForm.get('email')?.value;
        const password = this.registerForm.get('password')?.value;
        const username = this.registerForm.get('username')?.value;

        
        this.loading = true;
        this.authenticationService
            .register({email, password, username})
            .subscribe({
               next: (data) => {
                    // if (rememberMe) {
                    //     localStorage.setItem('savedUserEmail', email);
                    // } else {
                    //     localStorage.removeItem('savedUserEmail');
                    // }
                    const eventData = {
                        username,
                        password
                    }

                    this.globalFacadeService.sharedEventDataHandlerService.triggerGlobalEventHandler(eventData, 'REGISTER_SUCCESS');
                    if (data) {
                        this.router.navigate(['/auth-user/login']);
                        // localStorage.setItem('access_token', data.access_token);
                        // this.router.navigate(['/']);
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
