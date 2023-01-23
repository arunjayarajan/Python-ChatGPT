import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor() { }

  private subject = new Subject<any>();

  sendSignInEvent(){
    this.subject.next(true);
  }

  getSignInEvent(): Observable<any>{
    return this.subject.asObservable();
  }
}
