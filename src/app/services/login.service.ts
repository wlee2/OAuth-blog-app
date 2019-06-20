import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../classes/Auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: 'http://localhost:8309/api/Account/ExternalLogin?provider=Facebook&response_type=token&client_id=myApp&redirect_uri=http://localhost:4200/';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: 리모트 서버로 에러 메시지 보내기
      console.log(error); // 지금은 콘솔에 로그를 출력합니다.

      // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환합니다.
      return of(result as T);
    };
  }

  ExternalLogin(): Observable<Auth> {
    return this.http.get<Auth>(this.url)
      .pipe(
        catchError(this.handleError('error', null))
      );
  }

  constructor(
    private http: HttpClient
  ) { }
}
