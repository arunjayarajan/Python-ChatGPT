import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth, Amplify } from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { CONSTANTS } from '../constants';

export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {

  private authenticationSubject: BehaviorSubject<any>;

  constructor() {
    Amplify.configure({
      Auth: environment.cognito,
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
    });
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.email, user.password)
      .then(() => {
        this.SetAccessToken().then(()=>{});
        this.authenticationSubject.next(true);
      });
  }

  public signOut(): Promise<any> {
    return Auth.signOut()
      .then(() => {
        this.authenticationSubject.next(false);
      });
  }

  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
        .then((user: any) => {
          if (user) {
            return true;
          } else {
            return false;
          }
        }).catch(() => {
          return false;
        });
    }
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
      .then((cognitoUser: any) => {
        return Auth.updateUserAttributes(cognitoUser, user);
      });
  }

  public SetAccessToken(): Promise<string> {

    // TODO: Need to handle exception/error here if user is logged out or not logged in
    return Auth.currentSession().then(res => {
      let accessToken = res.getAccessToken();
      let jwt = accessToken.getJwtToken();
      localStorage.setItem(CONSTANTS.token, jwt);
      return jwt;
    });
  }

  public GetAccessToken(): Promise<string> {
    let token = localStorage.getItem(CONSTANTS.token);
    if (token === null) {
      return this.SetAccessToken();
    }
    else {
      return Promise.resolve(token);
    }
  }
}