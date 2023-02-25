import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CONSTANTS } from '../constants';
import { User } from '../models/user.model';
import { IUser, CognitoService } from '../services/cognito.service';
import { SignInService } from '../services/sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  @Output() dataEmit = new EventEmitter();
  
  loading: boolean;
  user: IUser;
  signInForm!: FormGroup
  submitted: boolean = false

  constructor(private router: Router,
              private cognitoService: CognitoService,
              private formBuilder:FormBuilder,
              private signInService: SignInService) {
    this.loading = false;
    this.user = {} as IUser;


  }

  ngOnInit(){
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    
    this.cognitoService.getCognitoEvent().subscribe((e: boolean) => {
      if(e){
        let t = localStorage.getItem(CONSTANTS.token)
        console.log(`Signedin with token: ${t}, user: ${this.user.email}`);
        
        let user: User = {username: '', email_id: this.user.email, first_name: '', last_name: '', address:''}
        this.signInService.signin(user).then(() => {
          this.signInService.sendSignedInEvent();
        });
      }
    });
  }

  public signIn(): void {
    this.submitted = true;
    
    if(this.signInForm.invalid){
      return;
    }

    this.user.email = this.signInForm.get('email')?.value;
    this.user.password = this.signInForm.get('password')?.value;
    this.loading = true;
    this.cognitoService.signIn(this.user)
    .then(() => {
      this.dataEmit.emit({ signInStatus: true });   
    }).catch(() => {
      this.loading = false;
      this.dataEmit.emit({ signInStatus: false });
    });
  }
}