import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const auth_api = 'http://127.0.0.1:5000/api/v1';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const user_key = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Registration method
  register(data : any): Observable<any> {
    return this.http.post(`${auth_api}/register`, data ,httpOptions);
  }

  // Check if user is authenticated
  isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(user_key);
    if (user) {
      return true;
    }

    return false;
  }

}
