import { Component } from '@angular/core';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  // Icon
  faPowerOff = faPowerOff

  profileMenu = false

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
