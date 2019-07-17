import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CurrentLocationService } from './current-location.service';
import { catchError } from 'rxjs/operators';
import { basicHeader, httpOptions } from '../common/header-options';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GooglePlaceService {
  private position: Position;
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // 클라이언트나 네트워크 문제로 발생한 에러.
      console.error('An error occurred:', error.error.message);
    } else {
      // 백엔드에서 실패한 것으로 보낸 에러.
      // 요청으로 받은 에러 객체를 확인하면 원인을 확인할 수 있습니다.
      console.error(
        `Backend returned code ${error.status}, ` +
        "body was: ", error.message);
    }
    // 사용자가 이해할 수 있는 에러 메시지를 반환합니다.
    return throwError(
      'Something bad happened; please try again later.');
  };

  constructor(
    private http: HttpClient,
    private currentLocation: CurrentLocationService,
    private cookieService: CookieService
  ) {
    this.currentLocation.getCurrentLocation.subscribe(
      (position: Position) => {
        this.position = position;
      },
      err => {
        console.error(err);
        window.alert(`${err.code} and ${err.message}`);
      }
    );
  }

  getPlaceAutocomplete(input: string): Observable<any> {
    if (!this.position) return new Observable(observer => { observer.error("geolocation error") });
    const url = `https://${window.location.hostname}:44368/api/place/autocomplete?lat=${this.position.coords.latitude}&lng=${this.position.coords.longitude}&input=${input}`;
    return this.http.get(url, httpOptions(this.cookieService.get("access_token")))
      .pipe(
        catchError(this.handleError)
      );
  }

  getPlaceDetail(id: string): Observable<any> {
    const url = `https://${window.location.hostname}:44368/api/Place/Detail?id=${id}`;
    return this.http.get(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPlacePhotoURL(photoRef: string): string {
    return `https://${window.location.hostname}:44368/api/place/photo?photoRef=${photoRef}`
  }
}
