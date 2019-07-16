import { Component, OnInit } from '@angular/core';
import { faPenAlt, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  faPenAlt = faPenAlt;
  faHome = faHome;

  constructor() { }

  ngOnInit() {
  }

}
