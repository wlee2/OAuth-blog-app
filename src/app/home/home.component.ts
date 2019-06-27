import { Component, OnInit } from '@angular/core';
import { Auth } from '../classes/Auth';
import { ActivatedRoute } from '@angular/router';
import { AuthHelperService } from '../services/auth-helper.service';
import { Store } from '@ngrx/store';
import { login } from '../store/user.action';

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

  constructor(private route: ActivatedRoute, private authHelper: AuthHelperService, private store: Store<{ user: string }>) {

    this.route.queryParams.subscribe(params => {
      this.JWT.external_access_token = params["external_access_token"];
      this.JWT.external_user_name = params["external_user_name"];
      this.JWT.provider = params["provider"];
      this.JWT.haslocalaccount = params["haslocalaccount"] === "True" ? true : false;
      this.JWT.user_id = params["user_id"];

      if (this.JWT.haslocalaccount === true) {
        this.authHelper.obtainToken(this.JWT).subscribe(res => {
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('userName', res.userName);
          localStorage.setItem('user_picture', res.user_picture);
          localStorage.setItem('user_url', res.user_url);
          this.store.dispatch(login({ name: res.userName, picture: res.user_picture, url: res.user_url }));
          this.authHelper.loginSucceed();
        });
      }

    })
  }

  ngOnInit() {

  }
}
