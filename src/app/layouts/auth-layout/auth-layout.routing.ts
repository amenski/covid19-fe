import { Routes } from '@angular/router';

import {LoginComponent} from "../../pages/login/login.component";
import {RegisterUserComponent} from "../../pages/register/register-user.component";


export const AuthLayoutRoutes: Routes = [
    { path: '', redirectTo: "login", pathMatch: "full" },
    { path: 'login', component: LoginComponent },
    { path: 'register-user', component: RegisterUserComponent },
];
