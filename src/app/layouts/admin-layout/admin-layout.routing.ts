import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { CasesComponent } from "../../pages/cases/cases.component";
import { HealthFacilitiesComponent } from "../../pages/health-facilities/health-facilities.component";
import { FollowUpComponent } from "../../pages/follow-up/follow-up.component";
import { UserComponent } from "../../pages/user/user.component";
import { QuestionnaireComponent } from "../../pages/questionnaire/questionnaire.component";
import {AuthGuard} from "../../helpers/auth.guard";
import {LoginComponent} from "../../pages/login/login.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
   // { path: "", redirectTo:"home", pathMatch: "full"},
  { path: '', redirectTo: "home", pathMatch: "full" },
  { path: 'home', component: DashboardComponent},
  { path: 'cases', component: CasesComponent, canActivate: [AuthGuard]},
  { path: 'health-facilities', component: HealthFacilitiesComponent, canActivate: [AuthGuard]},
  { path: 'follow-up', component: FollowUpComponent, canActivate: [AuthGuard]},
  { path: 'questionnaire', component: QuestionnaireComponent, canActivate: [AuthGuard]},
  { path: 'user', component: UserComponent},
];
