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


    this.profileService.getProfile().subscribe(
      res => {
        console.log(res);
        // Get profile information
        this.profileRoles = res?.roles;

        // Get profile datas
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

  // variables
  profileRoles : any = {};

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
