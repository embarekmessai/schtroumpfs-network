import { Component, OnInit } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from '../dashboard/dashboard.service';
import { SmurfsService } from './smurfs.service';

@Component({
  selector: 'app-smurfs',
  templateUrl: './smurfs.component.html',
  styleUrls: ['./smurfs.component.css']
})
export class SmurfsComponent implements OnInit {

  constructor(
    private smurfsService: SmurfsService
  ){ }

  ngOnInit(): void {
    this.smurfsService.getSmutfs().subscribe(
      (res : any) => {
        console.log(res);
        this.smurfs = res.users;
        // this.freind_smurfs = res.freinds;

        // Check if smurf is a freind
        this.smurfs.filter((el1: any) => {
          res.freinds.forEach((el2 : any) => {
            if(JSON.stringify(el1) === JSON.stringify(el2)){
              el1.isFreind = true;
            }
          });
        })

      },
      err => {
        console.log(err);

      }
    )

  }

  // Fontawsom icons
  faCheck = faCheck;
  faTimes = faTimes;

  // Variables
  smurfs : any = [];
  freind_smurfs : any = [];

}
