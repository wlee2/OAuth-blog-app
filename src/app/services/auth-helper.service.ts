import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RegisterExternalBindingModel } from '../classes/RegisterExternalBindingModel';
import { Store, select } from '@ngrx/store';
import { logout, login } from '../store/user.action';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { PostHttpOptions, httpOptions } from '../common/header-options';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {
  Name$: Observable<string>;

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // 클라이언트나 네트워크 문제로 발생한 에러.
      console.error('An error occurred:', error.error.message);
    } else {
      // 백엔드에서 실패한 것으로 보낸 에러.
      // 요청으로 받은 에러 객체를 확인하면 원인을 확인할 수 있습니다.
      console.error(
        `Backend returned code ${error.status}, ` +
        "body was: ", error.error);
    }
    // 사용자가 이해할 수 있는 에러 메시지를 반환합니다.
    return throwError(
      'Something bad happened; please try again later.');
  };

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/']);
    this.cookieService.deleteAll();
    this._snackBar.open("You have been successfully logged out 😎", "OK", {
      duration: 3000,
    });
  }

  loginSucceed(name: string) {
    window.history.replaceState({}, document.title, "/");
    this._snackBar.open(`Welcome ${name} 😊`, "OK", {
      duration: 3000,
    });
  }

  login(data) {
    this.store.dispatch(login({ Name: data.Name, Picture: data.Picture, Gender: data.Gender }));
    this.loginSucceed(data.Name);
  }

  getUserInfo(token: string): Observable<any> {
    const url = 'https://localhost:44368/api/account/UserInfo';
    return this.http.get(url, httpOptions(this.cookieService.get("access_token")))
      .pipe(
        catchError(this.handleError)
      );
  }

  RegistExternalUser(data: RegisterExternalBindingModel): Observable<any> {
    console.log(data);
    const url = 'https://localhost:44368/api/account/RegisterExternal';
    return this.http.post(url, { Email: data.email }, PostHttpOptions(this.cookieService.get("access_token")))
      .pipe(
        catchError(this.handleError)
      );
  }

  constructor(
    private http: HttpClient,
    private store: Store<{ user: string }>,
    private router: Router,
    private _snackBar: MatSnackBar,
    private cookieService: CookieService
  ) {
    this.Name$ = store.pipe(select('user')).pipe(select('Name'));
  }
}
