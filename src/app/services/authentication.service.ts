import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {BASE_URL} from '../helpers/constants'
import { User } from '../models/user';
import {JwtResponse} from "../models/jwtResponse";
import {JwtHelperService} from '@auth0/angular-jwt';

import { catchError } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user: User;
  jwtResponse: JwtResponse;
  private currentUserSubject: BehaviorSubject<string>;
  public currentUser: Observable<string>;
  helper = new JwtHelperService();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.user = new User();
    this.jwtResponse = new class implements JwtResponse {
      errors: Array<string>;
      jwtToken: string;
      message: string;
      resultCode: number;
      success: boolean;
      transactionId: string;
      type: string;
    };
  }

  login(username: string, password: string): Observable<JwtResponse> {
    this.user.email = username;
    this.user.password = password;
    return this.http.post<JwtResponse>(BASE_URL+'/v1/authenticate', this.user )
      .pipe(map(res => {
        // login successful if there's a jwt token in the response
        //   this.user.token = res;
          this.jwtResponse.jwtToken = res.jwtToken;

          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify( this.jwtResponse.jwtToken));
          this.currentUserSubject.next(this.jwtResponse.jwtToken);
        return this.jwtResponse;
      }), catchError(err => { return this.errorHandler(err)}));
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error.");
  }

  public get currentUserValue(): string {
    //alert("token to request: "+this.user.token)
    return this.currentUserSubject.value;
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  registerUser(firstName: string, lastName: string, email: any, password: any) {
    this.user.firstName = firstName;
    this.user.lastName = lastName;
    this.user.email = email;
    this.user.password = password;
    return this.http.post<any>(BASE_URL+'/v1/register-user', this.user )
      .pipe(map(res => {
        return this.user;
      }));
  }

  isLoggedIn() {
    const token = localStorage.getItem('currentUser');
    return this.helper.isTokenExpired(token);
  }
}
