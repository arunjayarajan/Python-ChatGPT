import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { API_URLS, CONSTANTS } from '../constants';
import { GrantRequest } from '../models/grant-request.model';
import { Grant } from '../models/grant.model';

@Injectable({
  providedIn: 'root'
})
export class GrantService {

  constructor(private http: HttpClient) { }

  public ListGrants(): Observable<Grant[]> {
    let url = `${environment.apiUrl}${API_URLS.grants}`;
    //url = 'https://catfact.ninja/fact';
    return new Observable(observer => {
      this.http.get<any>(url).subscribe({
        next: (result: any) => {
          let grants: Grant[] = result.data;
          //grants = this.getFakeGrants();
          observer.next(grants);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });    
  }

  public SendRequest(request: GrantRequest): Promise<string> {
    let url = `${environment.apiUrl}${API_URLS.request}`;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return lastValueFrom(this.http.post(url, request))
    .then(() => {return CONSTANTS.success})
    .catch((e) => { return e.message });
  }

  getFakeGrants(): Grant[]{
    let grants: Grant[] = [];
    grants.push({ grant_id: 1, name: "Solar Premium Panels", desc: "This is a global initiative not just limited to Ireland. A maximum of $100000 could be offered to a legitimate request. Providers are specific about the needs. The request should only be for solar power but no other alternatives" });
    grants.push({ grant_id: 2, name: "Rotors by the Beach", desc: "This is meant for wind power enthusiast who are keen to get mills installed near coastal areas." });
    grants.push({ grant_id: 3, name: "Super dynamos1", desc: "A new invention by a bunch of graduate students. The insturment could be fitted into any automobile and could generated 10% more power than a conventional dynamo." });
    grants.push({ grant_id: 4, name: "Super dynamos2", desc: "A new invention by a bunch of graduate students. The insturment could be fitted into any automobile and could generated 10% more power than a conventional dynamo." });
    grants.push({ grant_id: 5, name: "Super dynamos3", desc: "A new invention by a bunch of graduate students. The insturment could be fitted into any automobile and could generated 10% more power than a conventional dynamo." });
    grants.push({ grant_id: 6, name: "Super dynamos4", desc: "A new invention by a bunch of graduate students. The insturment could be fitted into any automobile and could generated 10% more power than a conventional dynamo." });
    grants.push({ grant_id: 7, name: "Super dynamos5", desc: "A new invention by a bunch of graduate students. The insturment could be fitted into any automobile and could generated 10% more power than a conventional dynamo." });
    grants.push({ grant_id: 8, name: "Super dynamos6", desc: "A new invention by a bunch of graduate students. The insturment could be fitted into any automobile and could generated 10% more power than a conventional dynamo." });
    grants.push({ grant_id: 9, name: "Super dynamos7", desc: "A new invention by a bunch of graduate students. The insturment could be fitted into any automobile and could generated 10% more power than a conventional dynamo." });    
    return grants;
  }
}
