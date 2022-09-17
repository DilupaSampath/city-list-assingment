import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs';

import { AuthenticationService } from 'src/app/modules/auth/services/auth.service';
import { SpinnerService } from '../../core/services/spinner.service';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserRoleEnum } from '../enums/user-role.enum';
import { Router } from '@angular/router';
import { ModalDialogIconColorEnum, ModalDialogIconTypeEnum, ModalDialogPrimaryButtonColorEnum } from '../enums/modal-dialog-input-types.enum';
import { GlobalFacadeService } from 'src/app/core/services/global-facade.service';
import { IUserData } from '../interfaces/user-data.interface';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {

    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    showSpinner: boolean = false;
    userName: string = "";
    isAdmin: boolean = false;

    private autoLogoutSubscription: Subscription = new Subscription;

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        public spinnerService: SpinnerService,
        private authService: AuthenticationService,
        private router: Router,
        private dialog: MatDialog,
        private globalFacadeService: GlobalFacadeService) {

        this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        // tslint:disable-next-line: deprecation
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {
        const user = this.authService.getCurrentUser();
        this.userName = user.username;
        const timer$ = timer(2000, 5000);
        this.autoLogoutSubscription = timer$.subscribe(() => {
            // this.authService.isAuthorized();
        });

        this.globalFacadeService.sharedEventDataHandlerService.globalEventHandler$.subscribe((eventData) => {
            if (eventData?.EVENT === 'NOT_AUTHORIZE') {
                this.openDialog(false);
            }
        });
    }

    ngOnDestroy(): void {
        // tslint:disable-next-line: deprecation
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.autoLogoutSubscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }

    logoutConfirm() {
        this.authService.logout();
        this.router.navigate(['/auth-user/login']);
    }
    logout() {
        this.openDialog(true);
    }
    openDialog(isLogOut: boolean): void {

        const dialogData: ConfirmDialogModel = {
            title: isLogOut ? 'Logout Warning' : 'Warning',
            message: isLogOut ? 'Are you sure you want to leave this page and logout?' : 'Please login before proceed',
            hasCancelButton: isLogOut,
            primaryText: isLogOut ? 'Yes' : 'Ok',
            colorPrimary: ModalDialogPrimaryButtonColorEnum.PRIMARY,
            colorSecondary: ModalDialogPrimaryButtonColorEnum.DEFAULT,
            iconType: ModalDialogIconTypeEnum.WARNING,
            iconColor: ModalDialogIconColorEnum.WARNING,
            onConfirm: this.logoutConfirm.bind(this)
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
}
