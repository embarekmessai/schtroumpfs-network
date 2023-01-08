import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @Input() modalStatus: boolean = false;
  @Output() modalEvent= new EventEmitter<boolean>();
  // hideCondition: boolean = false;
  faTimes = faTimes// close icon

  hideModal: any = () => {
    this.modalStatus = true;
    this.modalEvent.emit(true);

  }
}
