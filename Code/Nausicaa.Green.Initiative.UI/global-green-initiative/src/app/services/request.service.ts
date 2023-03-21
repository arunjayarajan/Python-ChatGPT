import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { API_URLS, CONSTANTS } from '../constants';
import { GrantRequest } from '../models/grant-request.model';
import { Grant } from '../models/grant.model';
import { UserRequest } from '../models/user-request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  public ListPendingRequests(status: string): Observable<GrantRequest[]> {
    let url = `${environment.apiUrl}${API_URLS.user_request}?status=${status}`;
    return new Observable(observer => {
      this.http.get<any>(url).subscribe({
        next: (result: any) => {
          let grants: GrantRequest[] = result.data;
          console.log(grants);
          observer.next(grants);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });    
  }

  public UpdateRequest(request: GrantRequest): Promise<string> {
    let url = `${environment.apiUrl}${API_URLS.user_request}`;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return lastValueFrom(this.http.put(url, request))
    .then(() => {return CONSTANTS.success})
    .catch((e) => { return e.message });
  }
}
