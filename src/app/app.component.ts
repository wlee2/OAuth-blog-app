import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from './store/user.action';
import { AuthHelperService } from './services/auth-helper.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OAuth-blog-app';

  constructor(
    private router: Router,
    private authHelper: AuthHelperService,
    private cookieService: CookieService
  ) {
    // if (this.cookieService.check('access_token') && this.cookieService.get('Registered') == "True") {
    //   this.authHelper.Name$.subscribe(name => {
    //     if (name == null) {
    //       this.authHelper.getUserInfo(cookieService.get('access_token')).subscribe(res => {
    //         this.authHelper.login(res);
    //       }, err => {
    //         console.error(err);
    //       })
    //     }
    //   })
    // }
    // else {
    //   this.cookieService.deleteAll();
    // }
  }
}
