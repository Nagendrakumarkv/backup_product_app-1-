import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from 'src/app/products/models/authData.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token!: String;
  private userIsAuthenticated = false;
  private tokenTimer: any;
  private userId: any;

  signupUrl = environment.apiUrl + '/user/signup';
  loginUrl = environment.apiUrl + '/user/login';

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }
  getUserId() {
    return this.userId;
  }
  getUserIsAuthenticated() {
    return this.userIsAuthenticated;
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };

    return this.http.post(this.signupUrl, authData);
  }
  loginUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number; userId: any }>(
        this.loginUrl,
        authData
      )
      .subscribe((response) => {
        const token = response.token;
        this.token = token;

        if (this.token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.userId = response.userId;

          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.userIsAuthenticated = true;

          this.saveAuthData(token, expirationDate, this.userId);

          this.router.navigate(['/dashboard']);
        }
      });
  }
  saveAuthData(token: string, expirationDate: Date, userId: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }
  clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('userId');
  }
  setAuthTimer(duration: any) {
    this.tokenTimer = setTimeout(() => {
      this.logOutUser();
    }, duration * 1000);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userIsAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
    }
  }
  getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiresIn');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
    };
  }
  logOutUser() {
    this.token = ' ';
    this.userIsAuthenticated = false;
    this.userId = ' ';
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/auth/login']);
  }

  geRegisteredtUserInfo() {
    return this.http.get(this.signupUrl);
  }
}
