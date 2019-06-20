import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Auth } from '../classes/Auth';
import { AuthHelperService } from '../services/auth-helper.service';

@Component({
  selector: 'app-auth-completed',
  templateUrl: './auth-completed.component.html',
  styleUrls: ['./auth-completed.component.scss']
})
export class AuthCompletedComponent implements OnInit {
  JWT: Auth = {
    external_access_token: "",
    external_user_name: "",
    provider: "",
    haslocalaccount: false
  };

  constructor(private route: ActivatedRoute, private authHelper: AuthHelperService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.JWT.external_access_token = params["external_access_token"];
      this.JWT.external_user_name = params["external_user_name"];
      this.JWT.provider = params["provider"];
      this.JWT.haslocalaccount = params["haslocalaccount"] === "True" ? true : false;

      console.log(this.JWT);

      if (this.JWT.haslocalaccount === true) {
        console.log("here");
        this.authHelper.obtainToken(this.JWT).subscribe(res => {
          localStorage.setItem('token', res.access_token);
          this.authHelper.loginSucceed();
          window.close();
        });
      }
    })
  }

}
