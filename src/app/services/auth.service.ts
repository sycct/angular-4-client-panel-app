import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User, UserManager, Log } from 'oidc-client';

const config: any = {
  authority: 'http://localhost:5000',
  client_id: 'corejs',
  redirect_uri: 'http://localhost:4200/login-callback',
  response_type: 'id_token token',
  scope: 'openid profile coreapi',
  post_logout_redirect_uri: 'http://localhost:4200/index.html',
};
Log.logger = console;
Log.level = Log.DEBUG;

@Injectable()
export class AuthService {

  mgr: UserManager = new UserManager(config);

  constructor() { }

  login() {
    this.mgr.signinRedirect();
  }

  loginCallBack() {
    return Observable.create(observer => {
      this.mgr.signinRedirectCallback().then(function () {
        observer.next();
        observer.complete();
      }).catch(function (e) {
        observer.error(e);
      });
    });
  }

  check() {
    this.mgr.getUser().then(function (user) {
      if (user) {
        console.log('User logged in', user.profile);
      } else {
        console.log('User not logged in');
      }
    });
  }
}
