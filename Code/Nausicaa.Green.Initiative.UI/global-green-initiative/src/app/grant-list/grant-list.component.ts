import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CONSTANTS } from '../constants';
import { Grant } from '../models/grant.model';
import { Toast } from '../models/toast.model';
import { GrantService } from '../services/grant.service';
import { SignInService } from '../services/sign-in.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-grant-list',
  templateUrl: './grant-list.component.html',
  styleUrls: ['./grant-list.component.scss']
})
export class GrantListComponent implements OnInit {

  loading: boolean = false;
  grants: Grant[] = [];
  selectedGrant: Grant = new Grant();
  isLoggedIn: boolean = false;
  applyGrantPop = {
    size: '70',
    show: false
  };

  constructor(private grantService: GrantService,
    private activatedRoute: ActivatedRoute,
    private signInService: SignInService,
    private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.getGrants();

    // listen to sigendIn event; after setting token
    this.signInService.getSignedInEvent().subscribe((e: boolean) => {
      this.isLoggedIn = true;
    })

    // listen to query string parameters
    this.activatedRoute.queryParams.subscribe((params) => {
      let firstSignIn = params[CONSTANTS.firstSignIn];

      let token = localStorage.getItem(CONSTANTS.token);

      // If the user is newly registered, prompt signin
      if(firstSignIn === 'true' && token === null){
        this.signInService.sendSignInEvent();
      }

      this.isLoggedIn = token != null;
    });
  }

  getGrants() {
    this.loading = true;
    this.grantService.ListGrants().subscribe({
      next: (grants: Grant[]) => {
        this.grants = grants;
        console.log(this.grants);
      },
      error: (error) => {
        console.log("Failed to fetch grants", error);
        let toastModel: Toast = { title: 'Error', message: 'Failed to fetch grants', colour: CONSTANTS.redColour, show:'show'};
        this.toastService.sendToastEvent(toastModel);
      }
    });
    this.loading = false;
  }

  applyGrantShow(selectedGrant:Grant){
    this.selectedGrant = selectedGrant;
    this.applyGrantPop.show = true;
    console.log(this.selectedGrant);
  }

  appliedGrant(e: any){
    this.applyGrantPop.show = false;
  }
}
