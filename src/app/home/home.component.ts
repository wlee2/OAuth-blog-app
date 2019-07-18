import { Component, OnInit, HostListener } from '@angular/core';
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
  pagination = 0;
  scrollFunction;
  wait = false;

  constructor(
    private reviewService: ReviewService
  ) {
    this.reviewService.getReviewData(this.pagination).subscribe(
      data => {
        this.reviewData = JSON.parse(data);
      }
    )
  }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    const documentHeight = document.body.scrollHeight - document.body.clientHeight + 100;
      //var percent = window.scrollY / documentHeight * 100;
      const dif = documentHeight - window.scrollY;
      if (dif < 700 && this.reviewData && !this.wait) {
        this.pagination++;
        this.wait = true;
        this.reviewService.getReviewData(this.pagination).subscribe(
          data => {
            const result = JSON.parse(data);
            if(result.length !== 0) {
              result.forEach(e => {
                this.reviewData.push(e);
              });
              this.wait = false;
            }
          }
        )
        console.log("update", this.reviewData);
      }
  }

}
