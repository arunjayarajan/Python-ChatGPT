import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Grant } from '../models/grant.model';

@Injectable({
  providedIn: 'root'
})
export class GrantService {

  constructor(private http: HttpClient) { }

  public ListGrants(): Observable<Grant[]> {
    let url = `${environment.apiUrl}grants`;
    url = 'https://catfact.ninja/fact';
    return new Observable(observer => {
      this.http.get<any>(url).subscribe({
        next: (result: any) => {
          let grants: Grant[] = result.data;
          grants = this.getFakeGrants();
          observer.next(grants);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });    
  }

  getFakeGrants(): Grant[]{
    let grants: Grant[] = [];
    grants.push({ id: 1, name: "Solar Premium Panels", description: "This is a global initiative not just limited to Ireland. A maximum of $100000 could be offered to a legitimate request. Providers are specific about the needs. The request should only be for solar power but no other alternatives" });
    grants.push({ id: 2, name: "Rotors by the Beach", description: "This is meant for wind power enthusiast who are keen to get mills installed near coastal areas." });
    grants.push({ id: 3, name: "Super dynamos1", description: "A new invention by a bunch of graduate students. The insturment could be fitted into any automobile and could generated 10% more power than a conventional dynamo." });
    grants.push({ id: 4, name: "Super dynamos2", description: "A new invention by a bunch of graduate students. The insturment could be fitted into any automobile and could generated 10% more power than a conventional dynamo." });
    grants.push({ id: 5, name: "Super dynamos3", description: "A new invention by a bunch of graduate students. The insturment could be fitted into any automobile and could generated 10% more power than a conventional dynamo." });
    grants.push({ id: 6, name: "Super dynamos4", description: "A new invention by a bunch of graduate students. The insturment could be fitted into any automobile and could generated 10% more power than a conventional dynamo." });
    grants.push({ id: 7, name: "Super dynamos5", description: "A new invention by a bunch of graduate students. The insturment could be fitted into any automobile and could generated 10% more power than a conventional dynamo." });
    grants.push({ id: 8, name: "Super dynamos6", description: "A new invention by a bunch of graduate students. The insturment could be fitted into any automobile and could generated 10% more power than a conventional dynamo." });
    grants.push({ id: 9, name: "Super dynamos7", description: "A new invention by a bunch of graduate students. The insturment could be fitted into any automobile and could generated 10% more power than a conventional dynamo." });    
    return grants;
  }
}
