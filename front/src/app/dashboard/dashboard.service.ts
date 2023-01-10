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

  // Set an authorization header

  smutfsCount() {
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${this.user.accessToken}`);
    return this.http.get(`${this.authService.auth_api}/dashboard/${this.user._id}`, httpOptions);
  }
}
