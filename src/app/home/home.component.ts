import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { ReviewData } from '../classes/ReviewData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  reviewData: ReviewData[];

  constructor(
    private reviewService: ReviewService
  ) {
    this.reviewService.getReviewData().subscribe(
      data => {
        this.reviewData = data;
        console.log(this.reviewData);
      }
    )
  }

  ngOnInit() {

  }
  
}
