import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {AuthenticationService} from '../../services/authentication.service';
import {first} from 'rxjs/operators';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  /*Alert options*/
  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private translateService: TranslateService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue && this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.logout();
      this.router.navigate(['/auth/login']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    let navigationExtras: NavigationExtras = {
      state: {
        username: this.f.username.value,
      }
    };
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(data => {
          this.router.navigate([this.returnUrl], navigationExtras);
        }, error => this.showErrorAndReset() );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  private showErrorAndReset() {
    this.loading=false;
    this.alertService.error(this.translateService.instant('login-error-msg'), this.alertOptions)
  }
}
