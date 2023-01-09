import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ){ };

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: [''],
  });
  isSuccessful = false;
  isLoggedFailed = false;
  errorMessage = '';

  ngOnInit(): void {
    console.log(this.authService.isLoggedIn());

  }

  onSubmit = () => {

    this.authService.login(this.loginForm.value).subscribe(
      data => {
        this.isSuccessful = true;
        this.isLoggedFailed = false;

        // Save user in session
        window.sessionStorage.setItem(this.authService.user_key, JSON.stringify(data));

        // redirect after connexion
        this.router.navigate(['/dashboard'])
      },

      err => {
        console.log(err.error);

        this.errorMessage = err.error;
        this.isLoggedFailed = true;
      }
    )
  }
}
