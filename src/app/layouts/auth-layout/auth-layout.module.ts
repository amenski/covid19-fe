import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {LoginComponent} from "../../pages/login/login.component";
import {RegisterUserComponent} from "../../pages/register/register-user.component";
import {TranslateModule} from "@ngx-translate/core";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    LoginComponent, RegisterUserComponent
  ]
})
export class AuthLayoutModule { }
