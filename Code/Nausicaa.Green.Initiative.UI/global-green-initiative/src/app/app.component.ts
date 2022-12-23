import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTANTS } from './constants';
import { CognitoService } from './services/cognito.service';
import { SignInService } from './services/sign-in.service';
import { Toast } from './models/toast.model';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'global-green-initiative';
  isAuthenticated: boolean;
  signInPop = {
    size: '50',
    show: false
  };

  toastModel: Toast = {
    show: 'hide',
    colour: CONSTANTS.blueColour,
    title: '',
    message: ''
  };

  constructor(private router: Router,
    private cognitoService: CognitoService,
    private signInService: SignInService,
    private toastService: ToastService) {
    this.isAuthenticated = false;

    this.signInService.getSignInEvent().subscribe(() => {
      this.showSignIn();
    });

    this.toastService.getToastEvent().subscribe((toastModel: Toast) => {
      this.showToast(toastModel.title, toastModel.message, toastModel.colour);
    });
  }

  public ngOnInit(): void {
    this.cognitoService.isAuthenticated()
      .then((success: boolean) => {
        this.isAuthenticated = success;
      });
  }

  public signOut(): void {
    this.cognitoService.signOut()
      .then(() => {
        localStorage.removeItem(CONSTANTS.token);
        window.location.reload();
      });
  }

  // after signing in
  signedIn(e: any) {
    this.signInPop.show = false;
    this.isAuthenticated = e.signInStatus;
    console.log(`Sign in status: ${e.signInStatus}`);
    window.location.reload();
  }

  showSignIn(): void {
    this.signInPop.show = true;
  }

  showToast(title: string, message: string, colour: string): void {
    this.toastModel.show = 'show';
    this.toastModel.colour = colour;
    this.toastModel.message = message;
    this.toastModel.title = title;
    this.countDownToast();
  }

  countDownToast() {
    setTimeout(() => {
      this.toastModel.show = "hide";
    }, 15000)
  }
}