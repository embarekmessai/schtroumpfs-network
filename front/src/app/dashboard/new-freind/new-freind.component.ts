import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-new-freind',
  templateUrl: './new-freind.component.html',
  styleUrls: ['./new-freind.component.css'],
})
export class NewFreindComponent {

  @Input() modalStatus: boolean = false;
  @Output() modalEvent= new EventEmitter<boolean>();
  // hideCondition: boolean = false;
  faTimes = faTimes// close icon

  hideModal: any = () => {
    this.modalStatus = true;
    this.modalEvent.emit(true);

  }
}
