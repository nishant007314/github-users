import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: Http) { }

  login(credentials) {
    return this.http.post('/api/authenticate', JSON.stringify(credentials))
      .pipe(
        map(response => {
          let result = response.json();
          if (result && result.token) {
            localStorage.setItem('token', result.token)
            return true;
          }
        })
      )
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    let tokenExpired = jwtHelper.isTokenExpired(token);

    return !tokenExpired;
  }

  getCurrentUser() {
    let token = localStorage.getItem('token');
    let currentUser = new JwtHelperService().decodeToken(token);
    return currentUser;
  }
}
