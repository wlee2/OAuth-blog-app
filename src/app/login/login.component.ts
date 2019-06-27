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
  userName$: Observable<string>;
  picture$: Observable<string>;
  userUrl$: Observable<string>;

  baseUrl = `https://${window.location.hostname}:44306/api/Account/ExternalLogin?provider=Facebook&response_type=token&client_id=myApp&redirect_uri=`;

  tryExternalLogin() {
    window.location.replace(`${this.baseUrl}${window.location.protocol}//${window.location.hostname}:4200`);
  }

  logout() {
    this.authService.logout();
  }

  redirectToUser() {
    this.userUrl$.subscribe(url => {
      window.location.href = url;
    });
  }

  constructor(
    private authService: AuthHelperService, private store: Store<{user: string}>
  ) {
    this.userName$ = store.pipe(select('user')).pipe(select('userName'));
    this.picture$ = store.pipe(select('user')).pipe(select('picture'));
    this.userUrl$ = store.pipe(select('user')).pipe(select('url'));
  }

  ngOnInit() {

  }

}
