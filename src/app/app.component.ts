import { Component } from '@angular/core';
import { AuthHelperService } from './services/auth-helper.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ReviewModel } from './classes/ReviewData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OAuth-blog-app';
  isLogin : boolean = false;
  reviewData: ReviewModel[];

  constructor(
    private route: ActivatedRoute,
    private authHelper: AuthHelperService,
    private cookieService: CookieService,
  ) {
    this.authHelper.Name$.subscribe(check => {
      if(check) this.isLogin = true;
      else this.isLogin = false;
    });

    this.iosTrick();
  }

  iosTrick() {
    if(!this.cookieService.check("iosTrick")) {
      this.cookieService.set("iosTrick", "true")
      window.location.href = `https://${window.location.hostname}:44368/api/reviews/handshake?redirectURL=${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    } 
  }

  ngOnInit() {
    this.checkHash();
  }

  checklogin() {
    if(this.cookieService.check('access_token')) {
      this.authHelper.getUserInfo().subscribe(
        user => {
          this.authHelper.login(user);
        },
        err => {
          this.cookieService.delete('access_token');
        }
      )
    }
  }

  checkHash() {
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
          console.error(err);
        }
      }
      this.checklogin();
    });
  }
}
