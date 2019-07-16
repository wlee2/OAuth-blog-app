import { Component, OnInit, ViewChild, QueryList } from '@angular/core';
import { GooglePlaceService } from '../services/google-place.service';
import { AgmMap, AgmInfoWindow } from '@agm/core';
import { ControlPosition } from '@agm/core/services/google-maps-types';
import { ReviewData } from '../classes/ReviewData';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ReviewService } from '../services/review.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.scss']
})
export class WriteReviewComponent implements OnInit {
  step = 0;

  reviewData: ReviewData;
  ID$: Observable<string>;
  userID: string;

  search: string;
  googleData: [];

  selectedData: {};
  review: string;
  rating: number = 0;

  zoomOption = {
    position: ControlPosition.LEFT_CENTER
  }

  constructor(
    private googlePlaceService: GooglePlaceService,
    private store: Store<{user: string}>,
    private reviewService: ReviewService,
  ) {
    this.ID$ = store.pipe(select('user')).pipe(select('ID'));
    this.ID$.subscribe(id => {
      this.userID = id;
    })
   }

  ngOnInit() {
  }

  autocomplete(event) {
    if (this.search) {
      this.googlePlaceService.getPlaceAutocomplete(this.search).subscribe(res => {
        this.googleData = JSON.parse(res).predictions;
      })
    }
    else {
      this.selectedData = null;
      this.googleData = null;
    }
  }

  placeSelect(data) {
    this.googlePlaceService.getPlaceDetail(data.place_id).subscribe(res => {
      this.selectedData = JSON.parse(res).result;
      console.log(this.selectedData);
    })
  }

  markerClick(infoWindow, $event) {
    infoWindow.open();
  }

  mapLoadSuccess(infoWindow, event) {
    infoWindow.open();
  }

  onRate($event: { newValue: number }) {
    this.rating = $event.newValue;
  }

  submit() {
    const date = new Date(); 
    this.reviewData = {
      LocationID: this.selectedData["place_id"],
      LocationName: this.selectedData["formatted_address"],
      Review: this.review,
      Rate: this.rating,
      UserID: this.userID,
      Date: new Date().toJSON()
    }

    console.log(this.reviewData);
    this.reviewService.postReviewData(this.reviewData).subscribe(
      res => {
        this.reviewService.postSucceed();
      },
      err => {
        console.error(err);
      }
    )
  }

  //step
  setStep(num: number) {
    this.step = num;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  //
}
