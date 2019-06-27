import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-blog-contents',
  templateUrl: './blog-contents.component.html',
  styleUrls: ['./blog-contents.component.scss']
})
export class BlogContentsComponent implements OnInit {

  id: string = '';
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => this.id = param.get('id'));
  }

}
