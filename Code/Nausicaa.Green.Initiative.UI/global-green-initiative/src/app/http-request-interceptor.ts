import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { CONSTANTS } from './constants';
import { CognitoService } from './services/cognito.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor
{
    constructor(private cognitoService: CognitoService){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem(CONSTANTS.token);
        const isApiUrl = req.url.startsWith(environment.apiUrl);
        if(token!=null && isApiUrl){
            req = req.clone({setHeaders: { Authorization: `Bearer ${token}` }});
        }
 
        return next.handle(req);
    }
}