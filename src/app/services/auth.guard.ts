import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthHelperService } from './auth-helper.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthHelperService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.authService.Name$.subscribe(res => {
      if (res) {
        this.isLoggedIn = true;
      }
      else {
        this.isLoggedIn = false;
      }
    })
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    window.scrollTo(0, 0);
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.isLoggedIn) {
      return true;
    }

    this._snackBar.open("Login Required!", "OK", {
      duration: 2000,
    });



    // Navigate to the login page with extras
    this.router.navigate(['/']);
    return false;
  }

}
