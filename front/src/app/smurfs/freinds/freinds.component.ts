import { Component, OnInit } from '@angular/core';
import { SmurfsService } from '../smurfs.service';
import { AuthService } from '../../auth/auth.service';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

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
      (res: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload()
        })

      },
      err => {
        console.log(err);
      }
    )

  }

}
