import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

export interface SigninCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootURL = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject<boolean | null>(null);
  username = '';

  constructor(
    private http: HttpClient,
  ) {
  }

  usernameAvailable(username: string) {
    return this.http.post<{ available: boolean }>(`${this.rootURL}/auth/username`, { username });
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<{ username: string }>(`${this.rootURL}/auth/signup`, credentials)
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }

  checkAuth() {
    return this.http.get<{ authenticated: boolean, username: string }>(`${this.rootURL}/auth/signedin`)
      .pipe(
        tap(({ authenticated, username }) => {
          this.signedin$.next(authenticated);
          this.username = username;
        })
      );
  }

  signin(credentials: SigninCredentials) {
    return this.http.post<{ username: string }>(`${this.rootURL}/auth/signin`, credentials)
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }

  signout() {
    return this.http.post(`${this.rootURL}/auth/signout`, {})
      .pipe(
        tap(() => this.signedin$.next(false))
      );
  }
}
