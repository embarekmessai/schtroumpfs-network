import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ){ };

  registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    fullname: [''],
    password: [''],
    password_conformation: [''],
  });
  isSuccessful = false;
  isRegistredFailed = false;
  errorMessage = '';

  onSubmit = () => {

    this.authService.register(this.registerForm.value).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isRegistredFailed = false;

        // Save user in session
        window.sessionStorage.setItem(this.authService.user_key, JSON.stringify(data));

        setTimeout(() => {
          // redirect after connexion
          this.router.navigate(['/dashboard'])
        }, 500);
      },

      err => {
        this.errorMessage = err.error;
        this.isRegistredFailed = true;
      }
    )
  }



}
