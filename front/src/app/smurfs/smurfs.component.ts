import { Component, OnInit } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { SmurfsService } from './smurfs.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-smurfs',
  templateUrl: './smurfs.component.html',
  styleUrls: ['./smurfs.component.css']
})
export class SmurfsComponent implements OnInit {

  constructor(
    private smurfsService: SmurfsService,
    private authService: AuthService
  ){ }

  // Get user from session
  userSession: any = window.sessionStorage.getItem(this.authService.user_key);
  user = JSON.parse(this.userSession);

  ngOnInit(): void {
    this.filterSmurf();
  }

  // Fontawsom icons
  faCheck = faCheck;
  faTimes = faTimes;

  // Variables
  smurfs : any = [];
  freinds_smurfs : any = [];

  // filter smurfs as freind
    //Simple promise
    filterPromess(data: any){
      return new Promise((res , rej) => {
        this.smurfs = data;

        if(this.smurfs) {
          res(this.smurfs);
        }
      })
    }

  filterSmurf() {
    this.smurfsService.getSmutfs().subscribe(
      (res : any) => {
        console.log(res.users);

        this.filterPromess(res.users)
            .then((response : any) => {
              // Check if smurf is a freind
              response.filter((el1: any) => {
                res.freinds.forEach((el2 : any) => {
                  if(JSON.stringify(el1) === JSON.stringify(el2)){
                    el1.isFreind = true;
                  }
                });
              })

            })
      },
      err => {
        console.log(err);
      }
    );
  };

  // Add freind method
  addFreind(freindId : any) {
    const data = {id: this.user._id, freindId: freindId}
    return this.smurfsService.addFreind(data).subscribe(
      res => {
        window.location.reload()

      },
      err => {
        console.log(err);
      }
    )


  }

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
