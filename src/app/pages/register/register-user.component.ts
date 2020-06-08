import { Component, OnInit } from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {first} from "rxjs/operators";

@Component({
  selector: "app-register-user",
  templateUrl: "register-user.component.html"
})
export class RegisterUserComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confPassword: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/auth/login';
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    if(this.registerForm.get('password').value!==this.registerForm.get('confPassword').value){
      alert("Password Mismatch!");
      return;
    }
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.registerUser(this.f.firstName.value, this.f.lastName.value, this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          // alert("token: "+ data);
          this.router.navigate([this.returnUrl]);
        });


  }
}
