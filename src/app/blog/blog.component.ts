import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { ControlPosition } from '@agm/core/services/google-maps-types';
import { Observable, observable } from 'rxjs';
import { CurrentLocationService } from '../services/current-location.service';
import { ReviewData } from '../classes/ReviewData';
import { GooglePlaceService } from '../services/google-place.service';
import { faThemeisle } from '@fortawesome/free-brands-svg-icons';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  faChevronCircleLeft = faChevronCircleLeft;
  faChevronCircleRight = faChevronCircleRight;
  @ViewChildren('imageTag') imageTags !: QueryList<any>;

  imageReady = false;
  imageReadyCounter = 0;
  moveCount: number = 0;
  moveTo;
  heightTo = "350px";
  dynamicHeight;
  dynamicWidth;

  lat: number = 43.7854208;
  lng: number = -79.41406719999999;
  zoomOption = {
    position: ControlPosition.RIGHT_CENTER
  }

  count = [0];

  @Input() review: ReviewData;
  locationDetail: {};
  writtenDate;

  //images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  // images = [
  //   `https://picsum.photos/900/500?random&t=${Math.random()}`,
  //   `https://picsum.photos/900/500?random&t=${Math.random()}`,
  //   "https://i.pinimg.com/564x/1c/7c/64/1c7c648811be78a62d837b98cd3f82a5.jpg",
  //   `https://picsum.photos/900/500?random&t=${Math.random()}`,
  //   "https://i.pinimg.com/564x/1c/7c/64/1c7c648811be78a62d837b98cd3f82a5.jpg",
  //   `https://picsum.photos/900/500?random&t=${Math.random()}`,
  //   `https://picsum.photos/900/500?random&t=${Math.random()}`,
  // ]
  images = [];

  imageToRight() {
    if (this.moveCount < this.images.length) {
      this.moveCount++;
      this.dynamicWidth = (this.imageTags.toArray()[this.moveCount].nativeElement as HTMLElement).offsetWidth;
      this.dynamicHeight = (this.imageTags.toArray()[this.moveCount].nativeElement as HTMLElement).offsetHeight;

      this.moveTo = `translateX(${-this.dynamicWidth * this.moveCount}px)`;
      this.heightTo = `${this.dynamicHeight}px`;
    }
  }

  imageToLeft() {
    if (this.moveCount > 0) {
      this.moveCount--;
      this.dynamicWidth = (this.imageTags.toArray()[this.moveCount].nativeElement as HTMLElement).offsetWidth;
      this.dynamicHeight = (this.imageTags.toArray()[this.moveCount].nativeElement as HTMLElement).offsetHeight;

      this.moveTo = `translateX(${-this.dynamicWidth * this.moveCount}px)`;
      this.heightTo = `${this.dynamicHeight}px`;
    }
  }

  moveCountChange(i) {
    this.moveCount = i;
    this.dynamicWidth = (this.imageTags.toArray()[this.moveCount].nativeElement as HTMLElement).offsetWidth;
    this.dynamicHeight = (this.imageTags.toArray()[this.moveCount].nativeElement as HTMLElement).offsetHeight;

    this.moveTo = `translateX(${-this.dynamicWidth * this.moveCount}px)`;
    this.heightTo = `${this.dynamicHeight}px`;
  }

  clickEvent(infoWindow, event) {
    infoWindow.open();
  }

  mapReady(infoWindow, event) {
    infoWindow.open();
  }

  onImageReady() {
    // half load to view on!
    if(this.imageReadyCounter < this.images.length / 2) {
      this.imageReadyCounter++;
    }
    else {
      this.dynamicHeight = (this.imageTags.toArray()[this.moveCount].nativeElement as HTMLElement).offsetHeight;
      this.heightTo = `${this.dynamicHeight}px`;
      this.imageReady = true;
    }
  }

  ngOnInit() {
    this.googlePlaceService.getPlaceDetail(this.review.LocationID).subscribe(
      res => {
        this.locationDetail = JSON.parse(res).result;
        this.writtenDate = new Date(this.review.Date).toLocaleDateString();
        console.log(this.locationDetail);
        this.locationDetail["photos"].forEach((photo, index) => {
          this.images.push(this.googlePlaceService.getPlacePhotoURL(photo.photo_reference));
          this.count.push(index + 1);
        });
      },
      err => {
        console.error(err);
      }
    )
  }
  
  constructor(
    private googlePlaceService: GooglePlaceService
  ) {
  }

}
