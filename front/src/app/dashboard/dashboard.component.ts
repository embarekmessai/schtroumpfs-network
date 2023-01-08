import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  openModalStatus: boolean = true;

  openModal: any = () => {
    this.openModalStatus = false
  }

  initiatModalStatus: any = () => {
    this.openModalStatus = true;
  }

}
