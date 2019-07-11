import { Component, OnInit } from '@angular/core';
import { AuthHelperService } from '../services/auth-helper.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterExternalBindingModel } from '../classes/RegisterExternalBindingModel';
import { getExpireDate } from '../common/token-expire-dates';

@Component({
  selector: 'app-register-external',
  templateUrl: './register-external.component.html',
  styleUrls: ['./register-external.component.scss']
})
export class RegisterExternalComponent implements OnInit {
  model: RegisterExternalBindingModel = {
    email: null
  }

  Regist() {
    this.authService.RegistExternalUser(this.model).subscribe(
      res => {
        if (res.access_token) {
          console.log("register function has been worked! ==> " + res.access_token);
          //this.cookieService.delete("access_token");
          this.cookieService.set('access_token', res.access_token, getExpireDate(1));
          this.cookieService.set('Registered', 'True', getExpireDate(1));
        }
      },
      err => {
        console.error(err);
      }
    )
  }
  constructor(
    private authService: AuthHelperService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (this.cookieService.get('Registered') == "True") {
      this.router.navigate([''])
    }
  }

}
