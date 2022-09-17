import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitiesRoutingModule } from './cities-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityListComponent } from './city-list/city-list.component';
import { CityItemComponent } from './city-item/city-item.component';

@NgModule({
  imports: [
    CommonModule,
    CitiesRoutingModule,
    SharedModule
  ],
  declarations: [
    CityListComponent,
    CityItemComponent
  ],
  entryComponents: [
  ]
})
export class CityModule { }
