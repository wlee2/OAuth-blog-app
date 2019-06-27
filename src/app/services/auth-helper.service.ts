import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Auth } from '../classes/Auth';
import { Store, select } from '@ngrx/store';
import { logout } from '../store/user.action';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {
  userName$: Observable<string>;

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.log("error");

      return of(result as T);
    };
  }

  logout() {
    localStorage.clear();
    this.store.dispatch(logout());
    this.router.navigate(['/']);

    this._snackBar.open("You have been successfully logged out 😎","OK", {
      duration: 3000,
    });
  }

  loginSucceed() {
    window.history.replaceState({}, document.title, "/");
    this.userName$.subscribe(res => {
      this._snackBar.open(`Welcome ${res} 😊`,"OK", {
        duration: 3000,
      });
    })
  }

  obtainToken(auth: Auth): Observable<any> {
    const targetUrl = `https://${window.location.hostname}:44306/api/Account/ObtainLocalAccessToken`;
    const paramsForObtain = new HttpParams().set("provider", auth.provider).set("externalAccessToken", auth.external_access_token);
    return this.http.get(targetUrl, { params: paramsForObtain })
      .pipe(
        tap(res => { console.log(res) }),
        catchError(this.handleError('error', null))
      )
  }

  constructor(
    private http: HttpClient,
    private store: Store<{ user: string }>,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.userName$ = store.pipe(select('user')).pipe(select('userName'));
  }
}
