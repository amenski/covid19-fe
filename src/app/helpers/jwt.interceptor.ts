import { Injectable } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUserToken = this.authenticationService.currentUserValue || localStorage.getItem('Authorization');
    //alert("INTERCEPT AND ADD TOKEN: "+ currentUserToken);
    if (currentUserToken) {

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUserToken}`
        }
      });
    }
    return next.handle(req);
  }
}
