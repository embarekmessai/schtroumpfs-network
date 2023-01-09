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

  getProfile() : Observable<UserProfile>{
    const userSession: any = window.sessionStorage.getItem(this.authService.user_key);
    const user = JSON.parse(userSession);

    return this.http.get<UserProfile>(`${auth_api}/profile/${user._id}`, { headers: new HttpHeaders({'Authorization' : `Bearer ${user.accessToken}`})})
  }
}
