import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from '../dashboard.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-new-freind',
  templateUrl: './new-freind.component.html',
  styleUrls: ['./new-freind.component.css'],
})


export class NewFreindComponent implements OnInit {

  constructor(
    private dashboardService : DashboardService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ){}


  ngOnInit(): void {
    // Set user id value to form
    // Get all schtroumpfs
    this.dashboardService.allSmutfs().subscribe(
      (res: any) => {
        console.log(res);

        this.smurfs = res
      },
      err => console.log(err)
    )
  }

  // Modal handler
  @Input() modalStatus: boolean = false;
  @Output() modalEvent= new EventEmitter<boolean>();
  // hideCondition: boolean = false;
  faTimes = faTimes// close icon

  hideModal: any = () => {
    this.modalStatus = true;
    this.modalEvent.emit(true);

  }

  // Get user from session
  userSession: any = window.sessionStorage.getItem(this.authService.user_key);
  user = JSON.parse(this.userSession);

  // All smurfs
  smurfs: any = [];

  // Freind form
  freindForm = this.formBuilder.group({
    id: [this.user._id],
    freindId: ['']
  });

  // Get error response variable
  errorMessage = '';

  // Submit freind information
  onSubmit() {
    this.dashboardService.addFreind(this.freindForm.value).subscribe(
      result => {
        this.freindForm.patchValue({freindId : ''})
        window.location.reload();
      },
      err => {
        console.log(err);

        this.errorMessage = err.error.message;

      }
    )
  }
}
