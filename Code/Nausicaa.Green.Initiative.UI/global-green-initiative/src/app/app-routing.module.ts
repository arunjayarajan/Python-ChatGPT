import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrantListComponent } from './grant-list/grant-list.component';
import { PendingRequestListComponent } from './pending-request-list/pending-request-list.component';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CookiesComponent, DisclaimerComponent, PrivacyComponent, TermsComponent } from './static-pages/static-pages.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'grantList',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'signUp',
    component: SignUpComponent,
  },
  {
    path: 'grantList',
    component: GrantListComponent,
  },
  {
    path: 'requests',
    component: PendingRequestListComponent,
  },
  {
    path: 'disclaimer',
    component: DisclaimerComponent,
  },
  {
    path: 'terms',
    component: TermsComponent,
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
  },
  {
    path: 'cookies',
    component: CookiesComponent,
  },
  {
    path: '**',
    redirectTo: 'grantList',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
