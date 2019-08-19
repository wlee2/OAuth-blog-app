import { Component, OnInit, HostListener } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { ReviewModel, ReviewData } from '../classes/ReviewData';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import { initReviewData, addReviewData, setPage, dataIsEnd } from '../store/user.action';

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
  dataIsEnd = false;

  constructor(
    private reviewService: ReviewService,
    private store: Store<{ user: string }>,
  ) {
    this.store.pipe(select('user')).pipe(select('ReviewData')).subscribe(
      data => {
        this.reviewData = data;
      }
    )

    this.store.pipe(select('user')).pipe(select('Page')).subscribe(
      page => {
        this.pagination = page;
      }
    )

    this.store.pipe(select('user')).pipe(select('DataIsEnd')).subscribe(
      dataIsEnd => {
        this.dataIsEnd = dataIsEnd;
      }
    )
  }

  ngOnInit() {
    if(!this.reviewData) {
      this.getData();
    }
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    const documentHeight = document.body.scrollHeight - document.body.clientHeight + 100;
      //var percent = window.scrollY / documentHeight * 100;
      const dif = documentHeight - window.scrollY;
      if (dif < 700 && this.reviewData && !this.wait && !this.dataIsEnd) {
        this.pagination++;
        this.store.dispatch(setPage({page: this.pagination}));
        this.wait = true;
        this.reviewService.getReviewData(this.pagination).subscribe(
          data => {
            if(data.length !== 0) {
              this.store.dispatch(addReviewData({reviewData: data}));
              this.wait = false;
            }
            if(data.length < 5) {
              this.store.dispatch(dataIsEnd({dataIsEnd: true}));
            }
          }
        )
        console.log("update", this.reviewData);
      }
  }

  getData() {
    this.reviewService.getReviewData(this.pagination).subscribe(
      data => {
        this.store.dispatch(initReviewData({reviewData: data}));
      },
      err => {
        window.alert(err);
      }
    );
  }

}
