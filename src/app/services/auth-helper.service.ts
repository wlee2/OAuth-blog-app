import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Auth } from '../classes/Auth';
import { LocalAccess } from '../classes/LocalAccess';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {

  

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.log("error");

      return of(result as T);
    };
  }

  // obtainToken(auth: Auth) {
  //   const url ='http://localhost:8309/api/Account/ObtainLocalAccessToken';
  //   return this.http.get(`${url}?provider=${auth.provider}&externalAccessToken=${auth.external_access_token}`)
  // }

  loginSucceed() {
    window.opener.location.pathname = "/"
  }

  obtainToken(auth: Auth): Observable<any> {
    const targetUrl = 'http://localhost:8309/api/Account/ObtainLocalAccessToken';
    const paramsForObtain = new HttpParams().set("provider", auth.provider).set("externalAccessToken", auth.external_access_token)
    return this.http.get(targetUrl, { params: paramsForObtain })
      .pipe(
        tap(_ => console.log("good to go")),
        catchError(this.handleError('error', null))
      )
  }

  constructor(private http: HttpClient) { }
}
