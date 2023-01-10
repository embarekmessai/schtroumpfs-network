import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import  { UserProfile } from '../types/user';

const auth_api = 'http://127.0.0.1:5000/api/v1';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  userSession: any = window.sessionStorage.getItem(this.authService.user_key);
  user = JSON.parse(this.userSession);

  getProfile() : Observable<UserProfile>{
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${this.user.accessToken}`);
    return this.http.get<UserProfile>(`${auth_api}/profile/${this.user._id}`, { headers: new HttpHeaders({'Authorization' : `Bearer ${this.user.accessToken}`})})
  }

  profileUpdate(data: any){
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${this.user.accessToken}`);
    return this.http.put(`${auth_api}/profile/${this.user._id}`, data, httpOptions )
  }
}
