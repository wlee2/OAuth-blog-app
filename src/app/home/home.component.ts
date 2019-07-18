import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { ReviewModel } from '../classes/ReviewData';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faMapMarkedAlt = faMapMarkedAlt;

  reviewData: ReviewModel[];

  constructor(
    private reviewService: ReviewService
  ) {
    this.reviewService.getReviewData().subscribe(
      data => {
        this.reviewData = JSON.parse(data);
      }
    )
  }

  ngOnInit() {

  }
  
}
