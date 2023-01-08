import { Component } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-smurfs',
  templateUrl: './smurfs.component.html',
  styleUrls: ['./smurfs.component.css']
})
export class SmurfsComponent {
  faCheck = faCheck
  faTimes = faTimes

}
