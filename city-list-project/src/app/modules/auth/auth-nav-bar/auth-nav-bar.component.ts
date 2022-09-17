import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-auth-nav-bar',
  templateUrl: './auth-nav-bar.component.html',
  styleUrls: ['./auth-nav-bar.component.css']
})
export class AuthNavBarComponent implements OnInit {

  displayName: string = "";
  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
    
  }
  logOut(){
    this.authService.logout();
  }
  
  isAuthenticated(){
    // return this.authService.isAunthenticated();
  }
  login(){
    
  }

}
