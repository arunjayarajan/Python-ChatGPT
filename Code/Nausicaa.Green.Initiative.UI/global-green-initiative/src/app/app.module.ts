import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptor } from './http-request-interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GrantListComponent } from './grant-list/grant-list.component';
import { PopupComponent } from './popup/popup.component';
import { ToastComponent } from './toast/toast.component';
import { RequestGrantComponent } from './request-grant/request-grant.component';
import { PendingRequestListComponent } from './pending-request-list/pending-request-list.component';
import { UpdateRequestGrantComponent } from './update-request-grant/update-request-grant.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    ProfileComponent,
    GrantListComponent,
    PopupComponent,
    ToastComponent,
    RequestGrantComponent,
    PendingRequestListComponent,
    UpdateRequestGrantComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
