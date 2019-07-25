import { Component, OnInit, SimpleChanges } from '@angular/core';
import { faFacebookSquare, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthHelperService } from '../services/auth-helper.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faFacebookSquare = faFacebookSquare;
  faGoogle = faGoogle
  faUserCircle = faUserCircle;
  Name$: Observable<string>;
  Picture$: Observable<string>;

  externalLogin(provider: string) {
    let baseUrl = `https://${window.location.hostname}:44368/api/Account/ExternalLogin?provider=${provider}&response_type=token&client_id=self&redirect_uri=`;
    window.location.replace(`${baseUrl}${window.location.protocol}//${window.location.hostname}:${window.location.port}/`);
  }

  logout() {
    this.authService.logout();
  }

  constructor(
    private authService: AuthHelperService, private store: Store<{user: string}>
  ) {
    this.Name$ = store.pipe(select('user')).pipe(select('Name'));
    this.Picture$ = store.pipe(select('user')).pipe(select('Picture'));
  }

  ngOnInit() {

  }

}
