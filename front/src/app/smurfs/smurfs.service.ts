import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SmurfsService {

  constructor(
    private authService:AuthService,
    private http: HttpClient
  ) { }

  // Get user from session
  userSession: any = window.sessionStorage.getItem(this.authService.user_key);
  user = JSON.parse(this.userSession);

  // Get all smurfs from server
  getSmutfs() {
    // Set an authorization header
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${this.user.accessToken}`);
    return this.http.get(`${this.authService.auth_api}/smurfs/${this.user._id}`, httpOptions);
  }

  // Add new smurf freind
  addFreind (data: object){
    // Set an authorization header
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${this.user.accessToken}`);
    return this.http.post(`${this.authService.auth_api}/freinds`, data, httpOptions)
  }

  // Add new smurf freind
  deleteFreind (data: object){
    // Set an authorization header
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${this.user.accessToken}`);
    return this.http.post(`${this.authService.auth_api}/freinds/${this.user._id}`, data, httpOptions)
  }
}
