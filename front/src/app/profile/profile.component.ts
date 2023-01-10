import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ProfileService } from './profile.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserProfile } from '../types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ){ }

  ngOnInit(): void {
    console.log('profile init');


    // Get profile datas
    this.profileService.getProfile().subscribe(
      res => {
        console.log(res);
        // Get profile information
        this.profileRoles = res?.roles;

        // Push profile datas to form
        this.profileForm.patchValue({
          username : res?.user.username,
          fullname : res?.user.fullname,
          role: res?.user.role,
        })


      },
      err => {
        window.sessionStorage.removeItem(this.authService.user_key);
        this.router.navigate(['/auth/login'])
        console.log(err);

      }
    );
  }

  // Update profile datas
  onSubmit() {
    this.profileService.profileUpdate(this.profileForm.value).subscribe(
      res => {
        console.log(res);
        this.hideModal();
        this.profileForm.patchValue({
          old_password : '',
          password : '',
          password_conformation: '',
        })
      },
      err => {
        console.log(err.error);
        this.errorMessage = err.error.message
      }
    )

  }

  // variables
  profileRoles : any = [];
  errorMessage : string | null = null;

  // hideCondition: boolean = false;
  faTimes = faTimes// close icon

  // Profile form
  profileForm = this.formBuilder.group({
    username: [''],
    fullname: [''],
    role: [''],
    old_password: [''],
    password: [''],
    password_conformation: [''],
  });


  // Inite modal
  @Input() modalStatus: boolean = false;
  @Output() modalEvent= new EventEmitter<boolean>();

  hideModal: any = () => {
    this.modalStatus = true;
    this.modalEvent.emit(true);

  }


}
