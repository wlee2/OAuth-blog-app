import { Component, OnInit, SimpleChanges } from '@angular/core';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthHelperService } from '../services/auth-helper.service';
import { Store, select, State } from '@ngrx/store';
import { logout, login, test } from '../store/user.action';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  facebookIcon = faFacebookSquare;
  userIcon = faUser;
  Name$: Observable<string>;
  Picture$: Observable<string>;

  baseUrl = `https://${window.location.hostname}:44368/api/Account/ExternalLogin?provider=Facebook&response_type=token&client_id=self&redirect_uri=`;

  tryExternalLogin() {
    window.location.replace(`${this.baseUrl}${window.location.protocol}//${window.location.hostname}:4200/`);
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
