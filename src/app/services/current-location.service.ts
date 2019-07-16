import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentLocationService {

  position: Position;

  constructor() { }

  subscribeLocation() {
    this.getCurrentLocation.subscribe((position: Position) => {
      this.position = position;
    })
  }

  getCurrentLocation = new Observable(observer => {
    // 접속 위치를 처리하는 API는 간단하게 사용해 봅니다.
    
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition(data => observer.next(data), err => observer.error(err));
    } else {
      observer.error('Geolocation not available');
    }
  });
}
