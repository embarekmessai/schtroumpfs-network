import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dashboardService : DashboardService
  ){}

  ngOnInit(): void {
    this.dashboardService.smutfsCount().subscribe(
      (result: any) => {
        this.schtroumpfs = result.schtroumpfs
        this.freinds_schtroumpfs = result.amis
      },
      err => {
        console.log(err);

      }
    )
  }

  // Get dashboard statistics
  schtroumpfs = 0;
  freinds_schtroumpfs = 0;

  // modal handling
  openModalStatus: boolean = true;

  openModal: any = () => {
    this.openModalStatus = false
  }

  initiatModalStatus: any = () => {
    this.openModalStatus = true;
  }

}
