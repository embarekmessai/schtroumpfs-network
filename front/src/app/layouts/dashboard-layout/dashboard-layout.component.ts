import { Component } from '@angular/core';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {
  // Icon
  faPowerOff = faPowerOff

  profileMenu = false

  openProfileMenu: any = () => {
    this.profileMenu = !this.profileMenu
  }
}
