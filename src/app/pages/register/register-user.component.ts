import { Component, OnInit } from "@angular/core";
import {FormGroup} from "@angular/forms";

@Component({
  selector: "app-register-user",
  templateUrl: "register-user.component.html"
})
export class RegisterUserComponent implements OnInit {
  registerForm: FormGroup;
  constructor() {}

  ngOnInit() {}
}
