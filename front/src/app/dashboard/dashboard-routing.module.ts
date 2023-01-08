import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SmurfsComponent } from '../smurfs/smurfs.component';

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
        path: 'smurfs',
        component: SmurfsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
