import { Component, OnInit, Input, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { element } from 'protractor';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  faChevronCircleLeft = faChevronCircleLeft;
  faChevronCircleRight = faChevronCircleRight;
  @ViewChild('imageTag', { static: false }) imageTag: ElementRef;
  @ViewChildren('imageTag') imageTags !: QueryList<any>;
  imageReady = false;

  moveCount: number = 0;
  moveTo;
  heightTo;
  dynamicHeight;
  dynamicWidth;
  heightestHeight;

  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  //   .pipe(
  //     map(result => result.matches)
  //   );
  @Input() blog;
  //images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  images = [
    `https://picsum.photos/900/500?random&t=${Math.random()}`,
    `https://picsum.photos/900/500?random&t=${Math.random()}`,
    "https://i.pinimg.com/564x/1c/7c/64/1c7c648811be78a62d837b98cd3f82a5.jpg",
    `https://picsum.photos/900/500?random&t=${Math.random()}`,
    "https://i.pinimg.com/564x/1c/7c/64/1c7c648811be78a62d837b98cd3f82a5.jpg",
    `https://picsum.photos/900/500?random&t=${Math.random()}`,
    `https://picsum.photos/900/500?random&t=${Math.random()}`,

  ]

  constructor() { }

  imageToRight() {
    if (this.moveCount < this.images.length - 1) {
      this.moveCount++;
      this.dynamicWidth = (this.imageTags.toArray()[this.moveCount].nativeElement as HTMLElement).offsetWidth;
      this.dynamicHeight = (this.imageTags.toArray()[this.moveCount].nativeElement as HTMLElement).offsetHeight;

      if (this.heightestHeight > this.dynamicHeight) {
        this.moveTo = `translate(${-this.dynamicWidth * this.moveCount}px, ${this.dynamicHeight -this.heightestHeight}px)`;
      }
      else {
        this.moveTo = `translate(${-this.dynamicWidth * this.moveCount}px, 0px)`;
      }
      this.heightTo = `${this.dynamicHeight}px`;
    }
  }

  imageToLeft() {
    if (this.moveCount > 0) {
      this.moveCount--;
      this.dynamicWidth = (this.imageTags.toArray()[this.moveCount].nativeElement as HTMLElement).offsetWidth;
      this.dynamicHeight = (this.imageTags.toArray()[this.moveCount].nativeElement as HTMLElement).offsetHeight;
      
      if (this.heightestHeight > this.dynamicHeight) {
        this.moveTo = `translate(${-this.dynamicWidth * this.moveCount}px, ${this.dynamicHeight - this.heightestHeight}px)`;
      }
      else {
        this.moveTo = `translate(${-this.dynamicWidth * this.moveCount}px, 0px)`;
      }
      this.heightTo = `${this.dynamicHeight}px`;
    }
  }

  imageLoaded() {
    if(!this.imageReady) {
      this.heightestHeight = this.imageTags.toArray().map(ele => {
        return (ele.nativeElement as HTMLElement).offsetHeight;
      });
      this.heightestHeight = Math.max.apply(null, this.heightestHeight);
      this.dynamicHeight = (this.imageTags.toArray()[this.moveCount].nativeElement as HTMLElement).offsetHeight;
      this.moveTo = `translate(0px, ${this.dynamicHeight - this.heightestHeight}px)`;  
      this.heightTo = `${this.dynamicHeight}px`;
    }
    this.imageReady = true;
    
  }

  ngOnInit() {
  }

}
