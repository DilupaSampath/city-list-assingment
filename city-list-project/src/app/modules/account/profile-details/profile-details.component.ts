import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  fullName: string = "";
  email: string = "";
  alias: string = "";

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.fullName = this.authService.getCurrentUser().username;
    this.email = this.authService.getCurrentUser().email;
  }

}
