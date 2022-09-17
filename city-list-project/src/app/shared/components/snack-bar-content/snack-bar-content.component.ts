import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-content',
  templateUrl: './snack-bar-content.component.html',
  styleUrls: ['./snack-bar-content.component.css']
})
// this is common componet for snack bar with default template
export class SnackBarContentComponent implements OnInit {

  constructor( public snackBarRef: MatSnackBarRef<SnackBarContentComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) {
      console.log(data);
     }

  ngOnInit(): void {
  }

}
