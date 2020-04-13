import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import {RumorReportingComponent} from "./rumor-reporting/rumor-reporting.component";


export const LandingLayoutRoutes: Routes = [
  // { path: "", redirectTo:"home", pathMatch: "full"},
  { path: '', redirectTo: "index", pathMatch: "full" },
  { path: 'index', component: DashboardComponent},
  { path: 'report-rumor', component: RumorReportingComponent},

];
