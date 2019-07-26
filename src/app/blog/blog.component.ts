import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { ControlPosition } from '@agm/core/services/google-maps-types';
import { ReviewModel } from '../classes/ReviewData';
import { GooglePlaceService } from '../services/google-place.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ReviewService } from '../services/review.service';

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
  dynamicWidth;
  userValidate = true;

  zoomOption = {
    position: ControlPosition.RIGHT_CENTER
  }

  @Input() review: ReviewModel;
  images = [];
  localeDate;


  imageToRight() {
    if (this.moveCount < this.images.length) {
      this.moveCount++;
      this.dynamicWidth = (this.imageTags.toArray()[this.moveCount].nativeElement as HTMLElement).offsetWidth;

      this.moveTo = `translateX(${-this.dynamicWidth * this.moveCount}px)`;
    }
  }

  imageToLeft() {
    if (this.moveCount > 0) {
      this.moveCount--;
      this.dynamicWidth = (this.imageTags.toArray()[this.moveCount].nativeElement as HTMLElement).offsetWidth;

      this.moveTo = `translateX(${-this.dynamicWidth * this.moveCount}px)`;
    }
  }

  moveCountChange(i) {
    this.moveCount = i;
    this.dynamicWidth = (this.imageTags.toArray()[this.moveCount].nativeElement as HTMLElement).offsetWidth;

    this.moveTo = `translateX(${-this.dynamicWidth * this.moveCount}px)`;
  }

  clickEvent(infoWindow, event) {
    infoWindow.open();
  }

  mapReady(infoWindow, event) {
    infoWindow.open();
  }

  onImageReady() {
    // half load to view on!
    if (this.imageReadyCounter < this.images.length / 2) {
      this.imageReadyCounter++;
    }
    else {
      this.imageReady = true;
    }
  }

  delete() {
    this.reviewService.deleteReviewData(this.review.ID).subscribe(ok => {
      location.reload();
    })
  }

  ngOnInit() {
    if (this.review.Photos.length == 0) {
      this.imageReady = true;
    }
    this.images = this.review.Photos.map((photo, index) => {
      return this.googlePlaceService.getPlacePhotoURL(photo.PhotoReference);
    })
    this.localeDate = new Date(this.review.WrittenDate).toLocaleDateString();

    this.store.pipe(select('user')).pipe(select('ID')).subscribe(id => {
      console.log(id, this.review.Author.UserID)
      if (this.review.Author.UserID == id) {
        this.userValidate = false;
      }
      else {
        this.userValidate = true;
      }
    });
  }



  constructor(
    private googlePlaceService: GooglePlaceService,
    private store: Store<{ user: string }>,
    private reviewService: ReviewService
  ) {
   
  }

}
