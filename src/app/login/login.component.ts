import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  tryExternalLogin() {
    
    
    window.open(`http://localhost:8309/api/Account/ExternalLogin?provider=Facebook&response_type=token&client_id=myApp&redirect_uri=http://localhost:4200/auth`, 'Authgenticate Account', 'location=0,status=0,width=600,height=750')
    //this.loginService.ExternalLogin().subscribe(res => console.log(res));
  }

  constructor(
    private loginService : LoginService
  ) { }

  ngOnInit() {
  }

}
