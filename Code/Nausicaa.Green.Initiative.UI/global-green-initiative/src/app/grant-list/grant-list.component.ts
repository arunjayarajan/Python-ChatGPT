import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CONSTANTS } from '../constants';
import { ApplyGrant } from '../models/apply-grant.model';
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
  applyGrantPop = {
    size: '50',
    show: false
  };

  constructor(private grantService: GrantService,
    private activatedRoute: ActivatedRoute,
    private signInService: SignInService,
    private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.getGrants();

    this.activatedRoute.queryParams.subscribe((params) => {
      let firstSignIn = params[CONSTANTS.firstSignIn];

      let token = localStorage.getItem(CONSTANTS.token);
      if(firstSignIn === 'true' && token === null){
        this.signInService.sendSignInEvent();
      }
    });
  }

  getGrants() {
    this.loading = true;
    this.grantService.ListGrants().subscribe({
      next: (grants: Grant[]) => {
        this.grants = grants;
        let toastModel: Toast = { title: 'Success', message: 'Fetched grjtts!', colour: CONSTANTS.blueColour, show:'show'};
        this.toastService.sendToastEvent(toastModel);
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
    console.log(e);
  }
}
