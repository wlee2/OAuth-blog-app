import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from './store/user.action';
import { AuthHelperService } from './services/auth-helper.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OAuth-blog-app';
  isLogin : boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authHelper: AuthHelperService,
    private cookieService: CookieService,
  ) {
    this.authHelper.Name$.subscribe(check => {
      if(check) this.isLogin = true;
      else this.isLogin = false;
    })
  }

  ngOnInit() {
    this.hashToCookie.subscribe(
      next => {
        if(next && !this.isLogin) {
          this.authHelper.getUserInfo().subscribe(
            user => {
              this.authHelper.login(user);
            },
            err => {
              console.error(err);
              this.cookieService.delete('access_token');
            }
          )
        }
      },
      err => {
        console.error(err);
      }
    )
  }

  hashToCookie = new Observable(observer => {
    this.route.fragment.subscribe(hash => {
      if (hash) {
        try {
          const tokenFromHash = new URLSearchParams(hash).get("access_token");
          const expireFromHash = new URLSearchParams(hash).get("expires_in");
          const now = Date.now();
          const expires_in = new Date(now + (1000 * parseInt(expireFromHash)));
          this.cookieService.set('access_token', tokenFromHash, expires_in);
        }
        catch (err) {
          observer.error(err);
        }
      }
      observer.next(this.cookieService.check('access_token'));
    });
  });

}
