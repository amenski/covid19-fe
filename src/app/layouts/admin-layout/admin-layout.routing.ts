import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { CasesComponent } from "../../pages/cases/cases.component";
import { HealthFacilitiesComponent } from "../../pages/health-facilities/health-facilities.component";
import { FollowUpComponent } from "../../pages/follow-up/follow-up.component";
import { UserComponent } from "../../pages/user/user.component";
import { QuestionnaireComponent } from "../../pages/questionnaire/questionnaire.component";
import {AuthGuard} from "../../helpers/auth.guard";
import {LoginComponent} from "../../pages/login/login.component";
import {AdminDashboardComponent} from "../../pages/admin-dashboard/admin-dashboard.component";
import {RumorListComponent} from "../../pages/rumors/rumor-list/rumor-list.component";
import {ScreeningComponent} from "../../pages/screening/screening.component";
import {RumorInvestigationComponent} from "../../pages/rumors/rumor-investigation/rumor-investigation.component";
import {ContactTracingComponent} from "../../pages/contact-tracing/contact-tracing.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
   // { path: "", redirectTo:"home", pathMatch: "full"},
  { path: '', redirectTo: "dashboard", pathMatch: "full" },
  { path: 'dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard]},
  { path: 'cases', component: CasesComponent, canActivate: [AuthGuard]},
  { path: 'contact-tracing', component: ContactTracingComponent, canActivate: [AuthGuard]},
  { path: 'health-facilities', component: HealthFacilitiesComponent, canActivate: [AuthGuard]},
  { path: 'rumor-list', component: RumorListComponent, canActivate: [AuthGuard]},
  { path: 'investigate-rumor', component: RumorInvestigationComponent, canActivate: [AuthGuard]},
  { path: 'screening', component: ScreeningComponent, canActivate: [AuthGuard]},
  { path: 'follow-up', component: FollowUpComponent, canActivate: [AuthGuard]},
  { path: 'questionnaire', component: QuestionnaireComponent, canActivate: [AuthGuard]},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
];
