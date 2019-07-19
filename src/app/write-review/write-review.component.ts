import { Component, OnInit } from '@angular/core';
import { GooglePlaceService } from '../services/google-place.service';
import { ControlPosition } from '@agm/core/services/google-maps-types';
import { ReviewData, Location, Photo } from '../classes/ReviewData';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ReviewService } from '../services/review.service';
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
    private store: Store<{ user: string }>,
    private reviewService: ReviewService,
  ) {
    this.ID$ = store.pipe(select('user')).pipe(select('ID'));
    this.ID$.subscribe(id => {
      this.userID = id;
    })
  }

  ngOnInit() {
    this.googlePlaceService.startGetGeoLocation();
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
    const location : Location = {
      Reference: this.selectedData["reference"],
      Name: this.selectedData["name"],
      Address: this.selectedData["formatted_address"],
      Lat: this.selectedData["geometry"]["location"]["lat"],
      Lng: this.selectedData["geometry"]["location"]["lng"]
    }

    const photos : Photo[] = [];

    if(this.selectedData["photos"]) {
      this.selectedData["photos"].forEach(photo => {
        photos.push(new Photo(photo["photo_reference"]));
      });
    }


    this.reviewData = {
      Author_ID: this.userID,
      Location: location,
      ReviewContent: this.review,
      PlaceRate: this.rating,
      Photos: photos,
      Comments: null
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
