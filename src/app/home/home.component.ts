import { Component, OnInit } from '@angular/core';
import { Auth } from '../classes/Auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthHelperService } from '../services/auth-helper.service';
import { Store } from '@ngrx/store';
import { login } from '../store/user.action';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  JWT: Auth = {
    external_access_token: "",
    external_user_name: "",
    provider: "",
    haslocalaccount: false,
    user_id: ""
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authHelper: AuthHelperService,
    private cookieService: CookieService,
    private store: Store<{ user: string }>
  ) {
    console.log(this.cookieService.getAll())
    // this.route.fragment.subscribe(hash => {
    //   if (hash != null) {
    //     let access_token = new URLSearchParams(hash).get("access_token");
    //     let expireString = new URLSearchParams(hash).get("expires_in");
    //     const now = Date.now();
    //     let expires_in = new Date(now + (1000 * parseInt(expireString)));
    //     this.cookieService.delete('access_token');
    //     cookieService.set('access_token', access_token, expires_in);

    //     if (this.cookieService.get('Registered') == 'True') {
    //       this.authHelper.getUserInfo(cookieService.get('access_token')).subscribe(res => {
    //         this.authHelper.login(res);
    //       }, err => {
    //         console.error(err);
    //       })
    //     }
    //     else {
    //      // this.router.navigate(['RegisterExternal'])
    //     }
    //   }
    // })

  }

  ngOnInit() {

  }
}
