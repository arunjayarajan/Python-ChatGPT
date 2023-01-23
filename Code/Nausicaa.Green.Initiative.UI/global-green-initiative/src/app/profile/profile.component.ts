import { Component, OnInit } from '@angular/core';
import { Grant } from '../models/grant.model';
import { User } from '../models/user.model';
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
  currentUser: User;

  constructor(private cognitoService: CognitoService,
    private backendService: GrantService) {
    this.loading = false;
    this.user = {} as IUser;
    this.grants = [];
    this.currentUser = {} as User;
  }

  public ngOnInit(): void {
    this.cognitoService.getUser()
    .then((user: any) => {
      this.user = user.attributes;
    });
  }

  public update(): void {
    this.loading = true;

    //aws cognito update
    this.cognitoService.updateUser(this.user)
    .then(() => {
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    });

    //api update
    let names = this.user.name.split(' ');
    this.currentUser.first_name = names[0];

    if(names.length > 1){this.currentUser.last_name = names[1];}
    this.currentUser.email_id = this.user.email;
    console.log(this.currentUser);
  }  
}