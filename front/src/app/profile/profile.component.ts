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
  ) { }

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
          username: res?.user.username,
          fullname: res?.user.fullname,
          role: res?.user.role?.name,
          image: res?.user.role?.image,
          avatar: res?.user.role?.avatar,
        })

        // Get profile image
          this.profileImage = res?.user.role?.image
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
          old_password: '',
          password: '',
          password_conformation: '',
        })
        window.location.reload();
      },
      err => {
        console.log(err.error);
        this.errorMessage = err.error.message
      }
    )

  }

  // variables
  profileRoles: any = [];
  errorMessage: string | null = null;

  profileImage: string | null| undefined = '';
  profileAvatar = '';

  // Schtroumpfs character
  alchemist = {
    avatar: '../../assets/images/personnages/alchemiste/alchemist-profile.jpg',
    image: '../../assets/images/personnages/alchemiste/alchemist.png'
  };
  enchanting = {
    avatar: '../../assets/images/personnages/enchanteur/enchanteur-profile.jpg',
    image: '../../assets/images/personnages/enchanteur/enchanteur.png'
  };
  spy = {
    avatar: '../../assets/images/personnages/espion/espion-profile.jpg',
    image: '../../assets/images/personnages/espion/espion.png'
  };
  warrior = {
    avatar: '../../assets/images/personnages/guerrier/guerrier-profile.jpg',
    image: '../../assets/images/personnages/guerrier/guerrier.png'
  };
  wizard = {
    avatar: '../../assets/images/personnages/sorcier/sorcier-profile.jpg',
    image: '../../assets/images/personnages/sorcier/sorcier.png'
  };

  // Change image & avatar foreach role
  changeImage(event: Event) {
    // Get the selected option value
    const value = (event.target as HTMLSelectElement).value;

    switch (value) {
      case 'Alchimiste':
        this.profileImage = this.alchemist.image;
        this.profileAvatar = this.alchemist.avatar;
        this.profileForm.get('image')?.setValue(this.alchemist.image);
        this.profileForm.get('avatar')?.setValue(this.alchemist.avatar);
        break;
      case 'Enchanteur':
        this.profileImage = this.enchanting.image;
        this.profileAvatar = this.enchanting.avatar;
        this.profileForm.get('image')?.setValue(this.enchanting.image);
        this.profileForm.get('avatar')?.setValue(this.enchanting.avatar);
        break;
      case 'Espions':
        this.profileImage = this.spy.image;
        this.profileAvatar = this.spy.avatar;
        this.profileForm.get('image')?.setValue(this.spy.image);
        this.profileForm.get('avatar')?.setValue(this.spy.avatar);
        break;
      case 'Guerrier':
        this.profileImage = this.warrior.image;
        this.profileAvatar = this.warrior.avatar;
        this.profileForm.get('image')?.setValue(this.warrior.image);
        this.profileForm.get('avatar')?.setValue(this.warrior.avatar);
        break;
      case 'Sorcier':
        this.profileImage = this.wizard.image;
        this.profileAvatar = this.wizard.avatar;
        this.profileForm.get('image')?.setValue(this.wizard.image);
        this.profileForm.get('avatar')?.setValue(this.wizard.avatar);
        break;

      default:
        this.profileImage = '';
        this.profileAvatar = '';
        break;
    }

  }

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
    image: [''],
    avatar: [''],
  });


  // Inite modal
  @Input() modalStatus: boolean = false;
  @Output() modalEvent = new EventEmitter<boolean>();

  hideModal: any = () => {
    this.modalStatus = true;
    this.modalEvent.emit(true);

  }


}
