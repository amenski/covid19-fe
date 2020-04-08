import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthenticateService, JwtRequest, JwtResponse} from 'app/generated';
import {User} from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user: User;
  jwtResponse: JwtResponse;
  private jwtRequest: JwtRequest;
  private currentUserSubject: BehaviorSubject<string>;
  public currentUser: Observable<string>;

  constructor(private http: HttpClient, private auth: AuthenticateService) {
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
    this.jwtRequest.email = username;
    this.jwtRequest.password = password;
    return this.auth.authenticateUser(this.jwtRequest).pipe(map(response => response));
  }

  public get currentUserValue(): string {
    // alert("token to request: "+this.user.token)
    return this.currentUserSubject.value;
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  registerUser(firstName: string, lastName: string, email: any, password: any) {
    // this.user.firstName = firstName;
    // this.user.lastName = lastName;
    // this.user.email = email;
    // this.user.password = password;
    // return this.http.post<any>(BASE_URL+'/v1/register-user', this.user )
    //   .pipe(map(res => {
    //     return this.user;
    //   }));
      return this.user;
  }
}
