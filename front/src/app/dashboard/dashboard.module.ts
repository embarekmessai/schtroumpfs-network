import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NewFreindComponent } from './new-freind/new-freind.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SmurfsComponent } from '../smurfs/smurfs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FreindsComponent } from '../smurfs/freinds/freinds.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NewFreindComponent,
    SmurfsComponent,
    FreindsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
