import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SmurfsComponent } from '../smurfs/smurfs.component';
import { FreindsComponent } from '../smurfs/freinds/freinds.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  },
  {
    path: 'smurfs',
    component: SmurfsComponent,
    children: [
      {
        path: '',
        component: SmurfsComponent
      },
    ]
  },
  {
    path: 'freinds',
    component: FreindsComponent,
    children: [
      {
        path: '',
        component: FreindsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
