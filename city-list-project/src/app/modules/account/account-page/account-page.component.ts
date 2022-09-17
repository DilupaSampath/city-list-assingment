import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalFacadeService } from 'src/app/core/services/global-facade.service';

import { IUserData } from 'src/app/shared/interfaces/user-data.interface';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  @Input() userId!: number;

  constructor(private titleService: Title, private globalFacadeService: GlobalFacadeService) { }

  ngOnInit() {
    this.titleService.setTitle('City List Project - Account');
  }


  loadUserData() {
    this.globalFacadeService.userService.getAll().subscribe((result: IUserData[]) => {
      this.globalFacadeService.sharedEventDataHandlerService.triggerGlobalEventHandler(result[0], 'LOAD_USER');
    });
  }

}
