import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarContentComponent } from 'src/app/shared/components/snack-bar-content/snack-bar-content.component';

@Injectable({
    providedIn: 'root'
})
//global snackBar notification service.
export class NotificationService {

    constructor(private snackBar: MatSnackBar) { }

    // open snackBar with string template
    public openSnackBar(message: string, className: string) {
        this.snackBar.open(message, '', {
            duration: 5000,
            panelClass: [className]
          });
    }
    
    // open snackBar with custom component template
    public openSnackBarWithComponent(messages: string[], panelClass: string) {
        this.snackBar.openFromComponent(SnackBarContentComponent, {
            data: messages,
            panelClass: panelClass,
            duration: 7000
          });
    }
}
