import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Get user from session
  userSession: any = window.sessionStorage.getItem(this.authService.user_key);
  user = JSON.parse(this.userSession);

  // Get schtroumpsf count
  smutfsCount() {
    // Set an authorization header
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${this.user.accessToken}`);
    return this.http.get(`${this.authService.auth_api}/dashboard/${this.user._id}`, httpOptions);
  }

  // Add new smurf freind
  addFreind (data: object){
    // Set an authorization header
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${this.user.accessToken}`);
    return this.http.post(`${this.authService.auth_api}/freinds`, data, httpOptions)
  }

  // Get all smurfs from server
  allSmutfs() {
    // Set an authorization header
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${this.user.accessToken}`);
    return this.http.get(`${this.authService.auth_api}/schtroumpfs`, httpOptions);
  }
}
