import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NewFreindComponent } from './new-freind/new-freind.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SmurfsComponent } from '../smurfs/smurfs.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NewFreindComponent,
    SmurfsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule
  ]
})
export class DashboardModule { }
