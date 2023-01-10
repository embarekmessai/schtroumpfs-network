import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  auth_api = 'http://127.0.0.1:5000/api/v1';

  user_key = 'auth-user';

  // Registration method
  register(data : any): Observable<any> {
    return this.http.post(`${this.auth_api}/register`, data ,httpOptions);
  }

  // Login method
  login(data : any): Observable<any> {
    return this.http.post(`${this.auth_api}/login`, data ,httpOptions);
  }

  // Login method
  logout(): Observable<any> {
    const userSession: any = window.sessionStorage.getItem(this.user_key);
    const user = JSON.parse(userSession);

    return this.http.post(`${this.auth_api}/logout`, null, { headers: new HttpHeaders({'Authorization' : `Bearer ${user.accessToken}`})})
  }

  // Check if user is authenticated
  isLoggedIn(): boolean {
    const userSession = window.sessionStorage.getItem(this.user_key);
    if (userSession) {
      // const user = JSON.parse(userSession);
      return true;
    }

    return false;
  }

}
