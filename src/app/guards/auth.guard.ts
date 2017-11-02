import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { User } from 'oidc-client';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.loginStatusChanged.map((user: User) => {
      if (user) {
        console.log('can access');
        return true;
      }
      this.authService.login();
      return false;
    });
  }
}
