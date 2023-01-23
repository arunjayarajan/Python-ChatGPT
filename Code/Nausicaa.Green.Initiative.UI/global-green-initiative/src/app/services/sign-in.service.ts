import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { API_URLS, CONSTANTS } from '../constants';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private http: HttpClient) { }

  private subject = new Subject<any>();
  private signedInSubject = new Subject<any>();

  sendSignInEvent(){
    this.subject.next(true);
  }

  // Meant for subscribers to capture post-signin
  getSignInEvent(): Observable<any>{
    return this.subject.asObservable();
  }

  // Meant for subscribers to capture post-signin
  getSignedInEvent(): Observable<any>{
    return this.signedInSubject.asObservable();
  }

  sendSignedInEvent(){
    this.signedInSubject.next(true);
  }

  public signin(user: User): Promise<string> {

    let url = `${environment.apiUrl}${API_URLS.signIn}`;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    let result: string = '';
    this.http.post(url, user).subscribe({
      next: (res: any) => {
        result = res;
        console.log('sign in successful!')
      },

      error: (error) => {
        console.log(`Error while posting sigin for ${user.email_id}`)
      }
  });

    return Promise.resolve(result);
  }
}
