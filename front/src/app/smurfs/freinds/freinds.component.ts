import { Component, OnInit } from '@angular/core';
import { SmurfsService } from '../smurfs.service';
import { AuthService } from '../../auth/auth.service';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-freinds',
  templateUrl: './freinds.component.html',
  styleUrls: ['./freinds.component.css']
})
export class FreindsComponent implements OnInit {


  constructor(
    private smurfsService: SmurfsService,
    private authService: AuthService
  ){ }

  // Get user from session
  userSession: any = window.sessionStorage.getItem(this.authService.user_key);
  user = JSON.parse(this.userSession);

  ngOnInit(): void {
    this.smurfsService.getSmutfs().subscribe(
      (res : any) => {
        this.freinds_smurfs = res.freinds;
      },
      err => {
        console.log(err);
      }
    );

  }

  // Fontawsom icons
  faCheck = faCheck;
  faTimes = faTimes;

  // Variables
  freinds_smurfs : any = [];

  // Delete freind method
  deleteFreind(freindId : any) {
    const data = {freindId: freindId}
    return this.smurfsService.deleteFreind(data).subscribe(
      res => {
        window.location.reload()
        console.log(res);


      },
      err => {
        console.log(err);
      }
    )

  }

}
