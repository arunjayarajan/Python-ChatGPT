import { Component, OnInit } from '@angular/core';
import { Grant } from '../models/grant.model';
import { IUser, CognitoService } from '../services/cognito.service';
import { GrantService } from '../services/grant.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  loading: boolean;
  user: IUser;
  grants: Grant[];

  constructor(private cognitoService: CognitoService,
    private backendService: GrantService) {
    this.loading = false;
    this.user = {} as IUser;
    this.grants = [];
  }

  public ngOnInit(): void {
    this.cognitoService.getUser()
    .then((user: any) => {
      this.user = user.attributes;
    });
  }

  public update(): void {
    this.loading = true;

    this.cognitoService.updateUser(this.user)
    .then(() => {
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    });
  }  
}