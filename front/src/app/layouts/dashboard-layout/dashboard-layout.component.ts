import { Component, OnInit } from '@angular/core';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from '../../profile/profile.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    console.log('profile init');


    // Get profile datas
    this.profileService.getProfile().subscribe(
      res => {
        // Get profile information
        this.avatar = res?.user.role?.avatar;
      },
      err => {
        window.sessionStorage.removeItem(this.authService.user_key);
        this.router.navigate(['/auth/login'])
        console.log(err);

      }
    );
  }
  // Icon
  faPowerOff = faPowerOff

  profileMenu = false;
  avatar: any = null;

  openProfileMenu: any = () => {
    this.profileMenu = !this.profileMenu
  }

  // Profile Modal
  openModalStatus: boolean = true;

  openModal: any = () => {
    this.openModalStatus = false
  }

  initiatModalStatus: any = () => {
    this.openModalStatus = true;
  }

  logout(): void {
    this.authService.logout().subscribe(
      res => {
        window.sessionStorage.removeItem(this.authService.user_key);
        this.router.navigate(['/auth/login'])
        console.log(res);

      },
      err => {
        window.sessionStorage.removeItem(this.authService.user_key);
        this.router.navigate(['/auth/login'])
        console.log(err.error)
      }
    )

  }

}
