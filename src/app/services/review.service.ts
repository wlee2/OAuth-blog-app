import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ReviewData } from '../classes/ReviewData';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

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
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  postSucceed() {
    this._snackBar.open("Your review has been updated!", "OK", {
      duration: 4000,
    });
    this.router.navigate(['/']);
  }

  getReviewData(): Observable<ReviewData[]> {
    const url = `https://${window.location.hostname}:44368/api/reviews`;
    return this.http.get<ReviewData[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  postReviewData(reviewData: ReviewData): Observable<any> {
    const url = `https://${window.location.hostname}:44368/api/reviews`;
    return this.http.post(url, reviewData)
      .pipe(
        catchError(this.handleError)
      );
  }
}